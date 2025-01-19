import { Exclude, Expose, Transform } from 'class-transformer';
import { formatToSpanish } from 'src/common/helpers/date-utils.helpers';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para la entidad "Libro".
 * 
 * Utiliza decoradores de class-transformer para exponer o excluir propiedades
 * y decoradores de class-validator para manejar validaciones opcionales.
 * Todas las propiedades marcadas con @Expose son enviadas al cliente.
 */
export class ResponseLibroDto {
  /**
   * Identificador único del libro (excluido de la respuesta).
   */
  @Exclude()
  _id: string;

  /**
   * Versión interna del documento en MongoDB (excluida de la respuesta).
   */
  @Exclude()
  __v: number;

  /**
   * ISBN del libro. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'El ISBN del libro', example: '9783161484100' })
  @Expose()
  isbn: string;

  /**
   * Título del libro. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'El título del libro', example: 'Cien Años de Soledad' })
  @Expose()
  titulo: string;

  /**
   * Autor del libro. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'El autor del libro', example: 'Gabriel García Márquez' })
  @Expose()
  autor: string;

  /**
   * Cantidad de copias disponibles en stock. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Cantidad de copias disponibles en stock', example: 5 })
  @Expose()
  stock: number;
   
   /**
    * Precio del libro. Se expone en la respuesta.
    */
   @ApiProperty({ description: 'El precio del libro', example: 25.99 })
   @Expose()
   precio: number;

   /**
    * Fecha de compra del libro. Se expone en la respuesta y se transforma al formato español.
    * 
    * @decorator `@Transform(({ value }) => formatToSpanish(value))` - Transforma la fecha al formato español.
    */
   @ApiProperty({ description: 'La fecha de compra del libro', example: '20-01-2025' })
   @Expose()
   @Transform(({ value }) => formatToSpanish(value))
   fechaCompra: string;

  /**
   * Género del libro (opcional). Se expone en la respuesta.
   */
  @ApiProperty({ description: 'El género del libro', required: false, example: 'Realismo Mágico' })
  @IsOptional()
  @Expose()
  genero?: string;

  /**
   * Fecha de publicación del libro (opcional). Se expone en la respuesta y se transforma al formato español.
   */
  @ApiProperty({ description: 'La fecha de publicación del libro', required: false, example: '05-10-1967' })
  @IsOptional()
  @Expose()
  @Transform(({ value }) => formatToSpanish(value))
  fechaPub?: string;

  /**
   * Resumen del libro (opcional). Se expone en la respuesta.
   */
  @ApiProperty({ description: 'El resumen del libro', required: false, example: 'Una novela sobre la historia de la familia Buendía en el pueblo ficticio de Macondo.' })
  @IsOptional()
  @Expose()
  resumen?: string;
}
