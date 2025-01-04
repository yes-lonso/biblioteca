import { Exclude, Expose, Transform } from 'class-transformer';
import { formatToSpanish } from 'src/common/helpers/date-utils.helpers';
import { IsOptional } from 'class-validator';

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
  @Expose()
  isbn: string;

  /**
   * Título del libro. Se expone en la respuesta.
   */
  @Expose()
  titulo: string;

  /**
   * Autor del libro. Se expone en la respuesta.
   */
  @Expose()
  autor: string;

  /**
   * Cantidad de ejemplares disponibles en stock. Se expone en la respuesta.
   */
  @Expose()
  stock: number;

  /**
   * Género del libro (opcional). Se expone en la respuesta,
   * y puede ser omitido si no está presente.
   */
  @Expose()
  @IsOptional()
  genero?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => formatToSpanish(value))
  fechaPub?: Date;

  @Expose()
  @IsOptional()
  resumen?: string;
}
