import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { ResponseVentaDto } from './dto/response-venta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Venta } from './entities/venta.entity';
import { Model } from 'mongoose';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Libro } from 'src/libros/entities/libro.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { plainToInstance } from 'class-transformer';
import { FindVentasDto } from './dto/find-ventas.dto';

@Injectable()
/**
 * Servicio responsable de manejar las operaciones de ventas.
 */
export class VentasService {
   /**
    * Construye una nueva instancia del VentasService.
    * @param ventaModel - El modelo que representa la colección de ventas.
    * @param prestamoModel - El modelo que representa la colección de préstamos.
    * @param libroModel - El modelo que representa la colección de libros.
    * @param usuarioModel - El modelo que representa la colección de usuarios.
    */
   constructor(
      @InjectModel(Venta.name)
      private readonly ventaModel: Model<Venta>,
      @InjectModel(Prestamo.name)
      private readonly prestamoModel: Model<Prestamo>,
      @InjectModel(Libro.name)
      private readonly libroModel: Model<Libro>,
      @InjectModel(Usuario.name)
      private readonly usuarioModel: Model<Usuario>,
   ) {}

   /**
    * Crea una nueva transacción de venta.
    * @param createVentaDto - El objeto de transferencia de datos que contiene los detalles de la venta.
    * @returns Una promesa que se resuelve con el DTO de respuesta de la venta creada.
    * @throws NotFoundException - Si el libro o el usuario no existen.
    * @throws ConflictException - Si el stock del libro es insuficiente o el usuario tiene un préstamo activo.
    * @throws InternalServerErrorException - Si ocurre un error durante la transacción.
    */
   async create(createVentaDto: CreateVentaDto): Promise<ResponseVentaDto> {
      const { idUsuario, idLibro, fechaVenta, descuento } = createVentaDto;

      const session = await this.ventaModel.db.startSession();

      try {
         const venta = await session.withTransaction(async () => {
            // Se valida que el libro exista
            const libro = await this.libroModel
               .findOne({ isbn: idLibro })
               .session(session)
               .exec();
            if (!libro) {
               throw new NotFoundException(
                  `El libro con ISBN '${idLibro}' no existe`,
               );
            }

            // Se valida que el libro tenga stock suficiente para la operación del préstamo
            // Restricción del sistema: en stock debe existir al menos 1 ejemplar del libro
            if (libro.stock <= 1) {
               throw new ConflictException(
                  `No hay ejemplares disponibles para la venta del libro '${libro.titulo}' con ISBN '${idLibro}'`,
               );
            }

            // Se verifica que el usuario exista
            const usuario = await this.usuarioModel
               .findOne({ email: idUsuario })
               .session(session)
               .exec();
            if (!usuario) {
               throw new NotFoundException(
                  `El usuario con ID '${idUsuario}' no existe`,
               );
            }

            // Se verifica que el usuario esté activo
            if (!usuario.activo) {
               throw new ConflictException(
                  `El usuario '${usuario.nombreCompleto}' con ID '${idUsuario}' no está activo`,
               );
            }

            // Se verifica que el usuario no tenga ningún libro prestado
            const prestamoBD = await this.prestamoModel
               .findOne({ idUsuario, fechaDevolucionReal: null })
               .session(session)
               .exec();
            if (prestamoBD) {
               throw new ConflictException(
                  `El usuario '${usuario.nombreCompleto}' con ID '${idUsuario}' ya tiene un préstamo activo con el libro ${prestamoBD.tituloLibro}-${prestamoBD.idLibro}`,
               );
            }

            // Calcular el descuento
            const precio = libro.precio - (libro.precio * descuento) / 100;

            // Crear la venta
            const venta = new this.ventaModel({
               idUsuario,
               idLibro,
               fechaVenta,
               precio,
               descuento,
               nombreUsuario: usuario.nombreCompleto,
               tituloLibro: libro.titulo,
               info:
                  descuento > 0
                     ? `Descuento del ${descuento}%`
                     : 'No se ha aplicado descuento',
            });

            // Se persiste la venta

            await venta.save({ session });

            // Actualizar el stock del libro
            libro.stock -= 1;
            await libro.save({ session });

            return venta;
         });

         // Se confirma la persistencia de los datos en BD
         await session.commitTransaction();

         return plainToInstance(ResponseVentaDto, venta, {
            excludeExtraneousValues: true,
         });
      } catch (error) {
         console.log(error);
         if (session.inTransaction()) {
            await session.abortTransaction();
         }
         if (
            error instanceof NotFoundException ||
            error instanceof ConflictException ||
            error instanceof BadRequestException
         ) {
            throw error;
         }
         throw new InternalServerErrorException(
            'Error al intentar registrar la venta del libro al usuario',
         );
      } finally {
         session.endSession();
      }
   }

   /**
    * Obtiene todas las ventas que coinciden con los criterios de búsqueda.
    * @param findVentasDto - El objeto de transferencia de datos que contiene los criterios de búsqueda.
    * @returns Una promesa que se resuelve con una lista de DTOs de respuesta de las ventas encontradas.
    */
   async findAll(findVentasDto: FindVentasDto): Promise<ResponseVentaDto[]> {
      const { idUsuario, idLibro, fechaInicio, fechaFin } = findVentasDto;

      const ventas = await this.ventaModel
         .find({
            idUsuario: idUsuario ? idUsuario : { $ne: null },
            idLibro: idLibro ? idLibro : { $ne: null },
            // Se filtran las ventas por fecha de venta
            // Si no se especifica la fecha de inicio, se establece la fecha mínima
            // Si no se especifica la fecha de fin, se establece la fecha máxima
            fechaVenta: {
               $gte: fechaInicio
                  ? new Date(fechaInicio)
                  : new Date('1900-01-01'),
               $lte: fechaFin ? new Date(fechaFin) : new Date(),
            },
         })
         .exec();

      return ventas.map((venta) =>
         plainToInstance(ResponseVentaDto, venta, {
            excludeExtraneousValues: true,
         }),
      );
   }
}