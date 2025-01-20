import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { formatToSpanish } from 'src/common/helpers/date-utils.helpers';

/**
 * DTO de respuesta para la entidad "Venta".
 *
 * Utiliza decoradores de class-transformer para exponer o excluir propiedades
 * y decoradores de class-validator para manejar validaciones opcionales.
 * Todas las propiedades marcadas con @Expose son enviadas al cliente.
 */
export class ResponseVentaDto {
   /**
    * Identificador único de la venta (excluido de la respuesta).
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
   @ApiProperty({
      description: 'ID del usuario que realizó la compra',
      example: 'usuario1@viu.es',
   })
   @Expose()
   idUsuario: string;

   /**
    * ID del libro vendido. Se expone en la respuesta.
    */
   @ApiProperty({
      description: 'ID del libro prestado',
      example: '9763161484100',
   })
   @Expose()
   idLibro: string;

   /**
    * Fecha de la venta. Se expone en la respuesta y se transforma al formato español.
    */
   @ApiProperty({ description: 'Fecha de la venta', example: '04-01-2025' })
   @Expose()
   @Transform(({ value }) => formatToSpanish(value))
   fechaVenta: Date;

   /**
    * Precio del libro vendido. Se expone en la respuesta.
    */
   @ApiProperty({ description: 'Precio del libro vendido', example: '20,35€' })
   @Transform(({ value }) => `${value.toFixed(2).replace('.', ',')}€`)
   @Expose()
   precio: number;

   /**
    * Información adicional de la venta. Se expone en la respuesta.
    */
   @ApiProperty({
      description: 'Información adicional de la venta',
      example: 'Descuento del 10%',
   })
   @Expose()
   info: string;

   /**
    * Nombre completo del usuario. Se expone en la respuesta.
    */
   @ApiProperty({
      description: 'Nombre completo del usuario',
      example: 'Juan Pérez',
   })
   @Expose()
   nombreUsuario: string;

   /**
    * Título del libro comprado. Se expone en la respuesta.
    */
   @ApiProperty({
      description: 'Título del libro prestado',
      example: 'Cien Años de Soledad',
   })
   @Expose()
   tituloLibro: string;
}
