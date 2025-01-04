import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { formatToSpanish } from 'src/common/helpers/date-utils.helpers';

/**
 * DTO de respuesta para la entidad "Prestamo".
 *
 * Utiliza decoradores de class-transformer para exponer o excluir propiedades
 * y decoradores de class-validator para manejar validaciones opcionales.
 * Todas las propiedades marcadas con @Expose son enviadas al cliente.
 */
export class ResponsePrestamoDto {
   /**
    * Identificador único del préstamo (excluido de la respuesta).
    */
   @Exclude()
   _id: string;

   /**
    * Versión interna del documento en MongoDB (excluida de la respuesta).
    */
   @Exclude()
   __v: number;

   /**
    * ID del usuario que realizó el préstamo. Se expone en la respuesta.
    */
   @Expose()
   idUsuario: string;

   /**
    * ID del libro prestado. Se expone en la respuesta.
    */
   @Expose()
   idLibro: string;
   
   /**
    * Fecha del préstamo. Se expone en la respuesta y se transforma al formato español.
    */
   @Expose()
   @Transform(({ value }) => formatToSpanish(value))
   fechaPrestamo: Date;

   /**
    * Fecha de devolución prevista. Se expone en la respuesta y se transforma al formato español.
    */
   @Expose()
   @Transform(({ value }) => formatToSpanish(value))
   fechaDevolucion: Date;

   /**
    * Fecha de devolución real (opcional). Se expone en la respuesta y se transforma al formato español si está presente.
    */
   @Expose()
   @IsOptional()
   @Transform(({ value }) => (value ? formatToSpanish(value) : value))
   fechaDevolucionReal?: Date;

   /**
    * Nombre completo del usuario. Se expone en la respuesta.
    */
   @Expose()
   @IsOptional()      
   nombreUsuario?: string;

   /**
    * Título del libro prestado. Se expone en la respuesta.
    */
   @Expose()
   @IsOptional()
   tituloLibro: string;


}
