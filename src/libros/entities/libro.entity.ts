import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
/**
 * Representa una entidad de libro con propiedades como ISBN, título, autor, stock, género, fecha de publicación y resumen.
 *
 * @class Libro
 * @extends Document
 *
 * @property {string} isbn - El Número Internacional Normalizado del Libro (ISBN) del libro. Es requerido, único y se almacena en minúsculas.
 * @property {string} titulo - El título del libro. Es requerido.
 * @property {string} autor - El autor del libro. Es requerido.
 * @property {number} stock - La cantidad de stock del libro. Por defecto es 1.
 * @property {double} precio - El precio del libro. Es requerido.
 * @property {Date} fechaCompra - La fecha de compra del libro. Es requerido.
 * @property {string} [genero] - El género del libro. Es opcional.
 * @property {Date} [fechaPub] - La fecha de publicación del libro. Es opcional.
 * @property {string} [resumen] - El resumen del libro. Es opcional.
 */
export class Libro extends Document {
   @ApiProperty({
      description:
         'El Número Internacional Normalizado del Libro (ISBN) del libro en versión:13',
      example: '9783161484100',
   })
   @Prop({
      required: true,
      unique: true,
      type: String,
      trim: true,
      lowercase: true,
   })
   isbn: string;

   @ApiProperty({
      description: 'El título del libro',
      example: 'Cien Años de Soledad',
   })
   @Prop({
      required: true,
      type: String,
      trim: true,
   })
   titulo: string;

   @ApiProperty({
      description: 'El autor del libro',
      example: 'Gabriel García Márquez',
   })
   @Prop({
      required: true,
      type: String,
      trim: true,
   })
   autor: string;

   @ApiProperty({ description: 'La cantidad de stock del libro', example: 5 })
   @Prop({
      required: true,
      type: Number,
      default: 1,
   })
   stock: number;

   @ApiProperty({ description: 'El precio del libro', example: 25.99 })
   @Prop({
      required: true,
      type: Number,
   })
   precio: number;

   @ApiProperty({
      description: 'El género del libro',
      required: false,
      example: 'Realismo Mágico',
   })
   @Prop({
      type: String,
      trim: true,
   })
   genero?: string;

   @ApiProperty({
      description: 'La fecha de publicación del libro',
      required: false,
      example: '05-06-1965',
   })
   @Prop({
      type: Date,
   })
   fechaPub?: Date;

   @ApiProperty({
      description: 'El resumen del libro',
      required: false,
      example:
         'Una novela sobre la historia de la familia Buendía en el pueblo ficticio de Macondo.',
   })
   @Prop({
      type: String,
      trim: true,
   })
   resumen?: string;
}

export const LibroSchema = SchemaFactory.createForClass(Libro);
