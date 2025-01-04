import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
   formatToSpanish,
   TransformDate,
} from 'src/common/helpers/date-utils.helpers';

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
 * @property {string} [genero] - El género del libro. Es opcional.
 * @property {Date} [fechaPub] - La fecha de publicación del libro. Es opcional.
 * @property {string} [resumen] - El resumen del libro. Es opcional.
 */
export class Libro extends Document {
   @Prop({
      required: true,
      unique: true,
      type: String,
      trim: true,
      lowercase: true,
   })
   isbn: string;

   @Prop({ required: true, type: String, trim: true })
   titulo: string;

   @Prop({ required: true, type: String, trim: true })
   autor: string;

   @Prop({ type: Number, default: 1 })
   stock: number;

   // Se añaden las propiedades opcionales genero, fechaPub y resumen
   @Prop({ type: String, trim: true })
   genero?: string;

   @Prop({ type: Date })
   fechaPub?: Date;

   @Prop({ type: String, trim: true })
   resumen?: string;
}

export const LibroSchema = SchemaFactory.createForClass(Libro);

/*
// Habilitar las propiedades virtuales en el esquema y excluir _id y __v
LibroSchema.set('toJSON', {
   versionKey: false, // Excluye la propiedad __v (versión del documento) de la salida JSON
   transform: (doc, ret) => {
      delete ret._id; // Elimina la propiedad _id de la salida JSON
      delete ret.id; // Elimina la propiedad id de la salida JSON
      if (ret.fechaPub) {
         ret.fechaPub = formatToSpanish(ret.fechaPub); // Formatea la fecha de publicación a formato español
      }
   },
});
*/
