import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { formatToSpanish } from 'src/common/helpers/date-utils.helpers';
import { IsOptional } from 'class-validator';

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
  @ApiProperty({ description: 'ID del usuario que realizó el préstamo', example: 'usuario1@viu.es' })
  @Expose()
  idUsuario: string;

  /**
   * ID del libro prestado. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'ID del libro prestado', example: '9783161484100' })
  @Expose()
  idLibro: string;

  /**
   * Fecha del préstamo. Se expone en la respuesta y se transforma al formato español.
   */
  @ApiProperty({ description: 'Fecha del préstamo', example: '04-01-2025' })
  @Expose()
  @Transform(({ value }) => formatToSpanish(value))
  fechaPrestamo: Date;

  /**
   * Fecha de devolución prevista. Se expone en la respuesta y se transforma al formato español.
   */
  @ApiProperty({ description: 'Fecha de devolución prevista', example: '15-01-2025' })
  @Expose()
  @Transform(({ value }) => formatToSpanish(value))
  fechaDevolucion: Date;

  /**
   * Fecha de devolución real (opcional). Se expone en la respuesta y se transforma al formato español si está presente.
   */
  @ApiProperty({ description: 'Fecha de devolución real', required: false, example: '14-01-2025' })
  @IsOptional()
  @Expose()
  @Transform(({ value }) => (value ? formatToSpanish(value) : value))
  fechaDevolucionReal?: Date;

  /**
   * Nombre completo del usuario. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Juan Pérez' })
  @Expose()
  nombreUsuario: string;

  /**
   * Título del libro prestado. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Título del libro prestado', example: 'Cien Años de Soledad' })
  @Expose()
  tituloLibro: string;
}
