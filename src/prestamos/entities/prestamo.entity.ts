import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Representa una entidad de préstamo con propiedades como ID de usuario, ID de libro, fechas de préstamo y devolución, nombre de usuario y título del libro.
 *
 * @class Prestamo
 * @extends Document
 *
 * @property {string} idUsuario - El ID del usuario que realiza el préstamo.
 * @property {string} idLibro - El ID del libro prestado.
 * @property {Date} fechaPrestamo - La fecha en que se realizó el préstamo.
 * @property {Date} fechaDevolucion - La fecha prevista para la devolución del libro.
 * @property {Date} [fechaDevolucionReal] - La fecha real en que se devolvió el libro.
 * @property {string} nombreUsuario - El nombre completo del usuario que realizó el préstamo.
 * @property {string} tituloLibro - El título del libro prestado.
 */
@Schema()
export class Prestamo extends Document {
  @ApiProperty({ description: 'ID del usuario que realiza el préstamo', example: 'usuario?@viu.es' })
  @Prop({ required: true, type: String })
  idUsuario: string;

  @ApiProperty({ description: 'ID del libro prestado', example: '9783161484100' })
  @Prop({ required: true, type: String })
  idLibro: string;

  @ApiProperty({ description: 'Fecha del préstamo', example: '04-01-2025' })
  @Prop({ required: true, type: Date })
  fechaPrestamo: Date;

  @ApiProperty({ description: 'Fecha prevista para la devolución del libro', example: '14-01-2025' })
  @Prop({ required: true, type: Date })
  fechaDevolucion: Date;

  @ApiProperty({ description: 'Fecha real de devolución del libro', required: false, example: '13-01-2025' })
  @Prop({ type: Date })
  fechaDevolucionReal?: Date;

  @ApiProperty({ description: 'Nombre completo del usuario que realizó el préstamo', example: 'Juan Pérez' })
  @Prop({ required: true, type: String })
  nombreUsuario: string;

  @ApiProperty({ description: 'Título del libro prestado', example: 'La Odisea' })
  @Prop({ required: true, type: String })
  tituloLibro: string;
}

export const PrestamoSchema = SchemaFactory.createForClass(Prestamo);

// Se define un índice compuesto único en idUsuario e idLibro
PrestamoSchema.index({ idUsuario: 1, idLibro: 1 }, { unique: true });
