import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FindPrestamoDto } from './dto/find-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { Libro } from 'src/libros/entities/libro.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { PrestamoResponseDto } from './dto/prestamo-response.dto';

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

    async create(createPrestamoDto: CreatePrestamoDto): Promise<PrestamoResponseDto> {
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

                return new PrestamoResponseDto(prestamo, usuario, libro);
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

    async findAll(findPrestamoDto: FindPrestamoDto): Promise<Prestamo[]> {
        // findPrestamoDto opcionalmente puede contener: 
        // el ISBN del libro
        // el email del usuario
        // se pueden recibir ambos datos
        // se puede no recibir ninguno de ellos

        const { isbn, email } = findPrestamoDto;
        const query: any = {};
        // Se construye la consulta
        // Se verifica si se recibió el ISBN o el email
        if (isbn) {
            query['idLibro'] = isbn;
        }
        if (email) {
            query['idUsuario'] = email;
        }
        // Se ejecuta la consulta
        try {
            return await this.prestamoModel.find(query).exec();
        } catch (error) {
            throw new InternalServerErrorException('Error al intentar obtener los préstamos');
        }

    }

    async update(updatePrestamoDto: UpdatePrestamoDto): Promise<Prestamo> {        
        // Este endpoint se implementa para la devolución de un libro
        // Se recibe el idUsuario y el idLibro y fechaDevolucion
        const { idUsuario, idLibro, fechaDevolucionReal } = updatePrestamoDto;

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
