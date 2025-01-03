import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FindPrestamoDto } from './dto/find-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { Libro } from 'src/libros/entities/libro.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ResponsePrestamoDto } from './dto/response-prestamo.dto';


/**
 * Servicio para gestionar los préstamos de libros en la biblioteca.
 * 
 * Este servicio proporciona métodos para crear, recuperar, actualizar y eliminar registros de préstamos.
 * Todos los métodos que modifican el estado de los préstamos o el stock de libros se ejecutan dentro de transacciones de MongoDB para asegurar la consistencia de los datos.
 * 
 * Métodos disponibles:
 * 
 * - `create(createPrestamoDto: CreatePrestamoDto): Promise<CreatePrestamoResDto>`: Crea un nuevo préstamo para un usuario, realizando varias validaciones y actualizando el stock del libro.
 * - `findAll(findPrestamoDto: FindPrestamoDto): Promise<Prestamo[]>`: Recupera todos los registros de préstamos basados en criterios de filtro opcionales.
 * - `update(updatePrestamoDto: UpdatePrestamoDto): Promise<Prestamo>`: Actualiza un registro de préstamo para registrar la devolución de un libro, deshabilitando la cuenta del usuario si la devolución es tardía.
 * - `remove(idUsuario: string, idLibro: string): Promise<Prestamo>`: Elimina un registro de préstamo y actualiza el stock del libro.
 */
@Injectable()
export class PrestamosService {
    constructor(
        @InjectModel(Prestamo.name)
        private readonly prestamoModel: Model<Prestamo>,
        @InjectModel(Libro.name)
        private readonly libroModel: Model<Libro>,
        @InjectModel(Usuario.name)
        private readonly usuarioModel: Model<Usuario>,
    ) { }

    /**
     * Crea un nuevo préstamo para un usuario.
     * 
     * Este método realiza, dentro de una transacción, varias validaciones antes de crear el préstamo:
     * - Verifica que el libro exista.
     * - Verifica que haya suficiente stock del libro.
     * - Verifica que el usuario exista y esté activo.
     * - Asegura que el usuario no tenga préstamos activos.
     * 
     * Si todas las validaciones son exitosas, crea el préstamo, actualiza el stock del libro y retorna los detalles del préstamo.
     * 
     * @param {CreatePrestamoDto} createPrestamoDto - Objeto de transferencia de datos que contiene los detalles del préstamo a crear.
     * @returns {Promise<ResponsePrestamoDto>} - Una promesa que se resuelve en el objeto de transferencia de datos de respuesta que contiene los detalles del préstamo creado.
     * 
     * @throws {NotFoundException} - Si el libro o usuario no existe.
     * @throws {ConflictException} - Si no hay stock del libro, el usuario no está activo, o el usuario ya tiene un préstamo activo.
     * @throws {InternalServerErrorException} - Si hay un error al intentar registrar el préstamo.
     */

    async create(createPrestamoDto: CreatePrestamoDto): Promise<ResponsePrestamoDto> {
        const { idUsuario, idLibro, diasPrestamo } = createPrestamoDto;

        const session = await this.prestamoModel.db.startSession();        

        try {
            const resultado = await session.withTransaction(async () => {
                // Se valida que el libro exista
                const libro = await this.libroModel.findOne({ isbn: idLibro }).session(session).exec();
                if (!libro) {
                    throw new NotFoundException(`El libro con ISBN ${idLibro} no existe`);
                }

                // Se valida que el libro tenga stock suficiente para la operación del préstamo
                if (libro.stock <= 0) {
                    throw new ConflictException(`No hay ejemplares disponibles del libro con ISBN ${idLibro}`);
                }

                // Se verifica que el usuario exista
                const usuario = await this.usuarioModel.findOne({ email: idUsuario }).session(session).exec();
                if (!usuario) {
                    throw new NotFoundException(`El usuario con ID ${idUsuario} no existe`);
                }

                // Se verifica que el usuario esté activo
                if (!usuario.activo) {
                    throw new ConflictException(`El usuario con ID ${idUsuario} no está activo`);
                }

                // Se verifica que el usuario no tenga ningún libro prestado
                const prestamoBD = await this.prestamoModel.findOne({ idUsuario, fechaDevolucionReal: null }).session(session).exec();
                if (prestamoBD) {
                    throw new ConflictException(`El usuario con ID ${idUsuario} ya tiene un préstamo activo`);
                }

                // Calcular la fecha de devolución
                const fechaDevolucion = new Date();
                fechaDevolucion.setDate(fechaDevolucion.getDate() + diasPrestamo);

                // Crear el préstamo
                const prestamo = new this.prestamoModel({
                    idUsuario,
                    idLibro,
                    fechaPrestamo: new Date(),
                    fechaDevolucion
                });

                await prestamo.save({ session });

                // Actualizar el stock del libro
                libro.stock -= 1;
                await libro.save({ session });

                return new ResponsePrestamoDto(prestamo, usuario, libro);
            });

            // Se confirma la persistencia de los datos en BD
            await session.commitTransaction();
            // Se retorna el resultado
            return resultado;
        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            if (error instanceof NotFoundException || error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al intentar registrar el préstamo del libro al usuario');
        } finally {
            session.endSession();
        }
    }

    /**
     * Recupera todos los registros de préstamos basados en criterios de filtro opcionales.
     * 
     * @param {FindPrestamoDto} findPrestamoDto - Objeto de Transferencia de Datos que contiene criterios de filtro opcionales:
     *   - `isbn` (opcional): El ISBN del libro.
     *   - `email` (opcional): El email del usuario.
     * 
     * @returns {Promise<Prestamo[]>} Una promesa que se resuelve en un array de registros de préstamos.
     * 
     * @throws {InternalServerErrorException} Si ocurre un error al intentar recuperar los registros de préstamos.
     */
    async findAll(findPrestamoDto: FindPrestamoDto): Promise<ResponsePrestamoDto[]> {
        // findPrestamoDto opcionalmente puede contener: 
        // el ISBN del libro
        // el email del usuario
        // se pueden recibir ambos datos
        // se puede no recibir ninguno de ellos

        const { idLibro, idUsuario, estado } = findPrestamoDto;
        const query: any = {};
        // Se construye la consulta
        // Se verifica si se recibió el ISBN o el email
        if (idLibro) {
            query['idLibro'] = idLibro;
        }
        if (idUsuario) {
            query['idUsuario'] = idUsuario;
        }
        // estado puede ser 'todos', 'prestados' o 'devueltos'
        // si se recibe 'prestados' se busca los préstamos que no han sido devueltos
        // si se recibe 'devueltos' se buscan los préstamos que han sido devueltos
        if (estado === 'prestados') {
            query['fechaDevolucionReal'] = null;
        } else if (estado === 'devueltos') {
            query['fechaDevolucionReal'] = { $ne: null };
        }
        // si no se recibe el parámetro enPrestamo
        // se devuelven todos los préstamos


        // Se ejecuta la consulta
        try {
            const prestamos = await this.prestamoModel.find(query).exec();
            // recorrer los resultados y construir un array de objetos ResponsePrestamoDto
            // para cada resultado se debe obtener el usuario y el libro asociado
            const responsePrestamos = [];
            for (const prestamo of prestamos) {
                const usuario = await this.usuarioModel.findOne({ email: prestamo.idUsuario }).exec();
                const libro = await this.libroModel.findOne({ isbn: prestamo.idLibro }).exec();
                responsePrestamos.push(new ResponsePrestamoDto(prestamo, usuario, libro));
            }
            return responsePrestamos;
        } catch (error) {
            throw new InternalServerErrorException('Error al intentar obtener los préstamos');
        }

    }

    /**
     * Actualiza un registro de préstamo para registrar la devolución de un libro.
     * 
     * Este método realiza los siguientes pasos dentro de una transacción:
     * 1. Valida que el libro exista.
     * 2. Valida que el libro esté actualmente prestado.
     * 3. Valida que el usuario exista.
     * 4. Valida que el usuario tenga el libro prestado.
     * 5. Actualiza el registro de préstamo con la fecha de devolución real.
     * 6. Si la fecha de devolución real es posterior a la fecha de devolución esperada, la cuenta del usuario se deshabilita.
     * 7. Incrementa el stock del libro para indicar que al menos está disponible en una unidad.
     * 
     * @param {UpdatePrestamoDto} updatePrestamoDto - Objeto de Transferencia de Datos que contiene los detalles de la actualización.
     * @returns {Promise<Prestamo>} - El registro de préstamo actualizado.
     * @throws {NotFoundException} - Si el libro, préstamo o usuario no existen.
     * @throws {ConflictException} - Si el usuario no tiene el libro prestado.
     * @throws {InternalServerErrorException} - Si ocurre un error durante la transacción.
     */
    async update(updatePrestamoDto: UpdatePrestamoDto): Promise<ResponsePrestamoDto> {                
        const { idUsuario, idLibro, fechaDevolucionReal } = updatePrestamoDto;

        const session = await this.prestamoModel.db.startSession();
        try {
            const resultado = await session.withTransaction(async () => {
                
                // Se valida que el libro exista
                const libro = await this.libroModel.findOne({ isbn: idLibro }).session(session).exec();
                if (!libro) {
                    throw new NotFoundException(`El libro con ISBN ${idLibro} no existe`);
                }
                // Se valida que el usuario exista
                const usuario = await this.usuarioModel.findOne({ email: idUsuario }).session(session).exec();
                if (!usuario) {
                    throw new NotFoundException(`El usuario con ID ${idUsuario} no existe`);
                }                

                // Se valida que el libro actualmente se encuentre en situación de prestado al usuario
                const prestamo = await this.prestamoModel.findOne({ idUsuario, idLibro, fechaDevolucionReal: null }).session(session).exec();
                if (!prestamo) {
                    throw new NotFoundException(`El usuario '${usuario.nombreCompleto}' (email: ${idUsuario}) no tiene prestado el libro '${libro.titulo}' (ISBN: ${idLibro})`);
                }
                                 
                // Se actualiza el préstamo
                prestamo.fechaDevolucionReal = fechaDevolucionReal;
                await prestamo.save({ session });

                // Si la fecha de devolución real es posterior a la fecha de devolución establecida
                // se sanciona al usuario desabilitando su cuenta
                if (fechaDevolucionReal > prestamo.fechaDevolucion) {
                    usuario.activo = false;
                    await usuario.save({ session });
                }

                // Se cambia la propiedad disponible a true
                libro.stock += 1;
                await libro.save({ session });

                return new ResponsePrestamoDto(prestamo, usuario, libro);
            });
            await session.commitTransaction();
            return resultado;

        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            if (error instanceof NotFoundException || error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al intentar registrar la devolución del préstamo del usuario');
        } finally {
            session.endSession();
        }        
    }

    /**
     * Elimina un registro de préstamo y actualiza el stock del libro.
     * 
     * @param idUsuario - El email del usuario que devuelve el libro
     * @param idLibro - El ISBN del libro que se está devolviendo
     * @returns Una Promesa que se resuelve en el registro de Prestamo eliminado
     * @throws NotFoundException si el libro no existe, no está prestado, o el usuario no existe
     * @throws ConflictException si el usuario especificado no tiene el libro prestado
     * @throws InternalServerErrorException si hay un error durante la transacción
     * 
     * @remarks
     * Este método utiliza una transacción de MongoDB para asegurar la consistencia de los datos:
     * 1. Valida la existencia del libro
     * 2. Valida la existencia del préstamo
     * 3. Valida la existencia del usuario
     * 4. Valida que el usuario tenga el libro prestado
     * 5. Elimina el registro del préstamo
     * 6. Actualiza el stock del libro
     */
    async remove(idUsuario:string, idLibro:string) : Promise<Prestamo> {
        // Este endpoint implementa la eliminación de un préstamo
        // Se recibe el idUsuario y el idLibro
        const session = await this.prestamoModel.db.startSession();
        session.startTransaction();
        try {
            const resultado = await session.withTransaction(async () => {
                // Se valida que el libro exista
                const libro = await this.libroModel.findOne({ isbn: idLibro }).session(session).exec();
                if (!libro) {
                    throw new NotFoundException(`El libro con ISBN ${idLibro} no existe`);
                }
                // Se valida que el libro actualmente se encuentre en situación de prestado
                const prestamo = await this.prestamoModel.findOne({ idUsuario, idLibro, fechaDevolucionReal: null }).session(session).exec();
                if (!prestamo) {
                    throw new NotFoundException(`El libro con ISBN ${idLibro} no está prestado`);
                }
                // Se valida que el usuario exista
                const usuario = await this.usuarioModel.findOne({ email: idUsuario }).session(session).exec();
                if (!usuario) {
                    throw new NotFoundException(`El usuario con ID ${idUsuario} no existe`);
                }
                // Se valida que el usuario tenga el libro prestado
                if (prestamo.idUsuario !== idUsuario) {
                    throw new ConflictException(`El usuario con ID ${idUsuario} no tiene el libro con ISBN ${idLibro} prestado`);
                }

                // Se elimina el préstamo
                await prestamo.deleteOne({ session });

                // Se actualiza el stock del libro
                libro.stock += 1;
                await libro.save({ session });

                return prestamo;
            });
            await session.commitTransaction();
            return resultado;

        } catch (error) {
            await session.abortTransaction();
            throw new InternalServerErrorException('Error al intentar realizar la devolución del préstamo');
        } finally {
            session.endSession();
        }
    }
}
