import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
/**
 * Representa una transacción de venta en el sistema.
 *
 * @class Venta
 * @extends Document
 *
 * @property {string} idUsuario - ID del usuario que realiza la venta.
 * @property {string} idLibro - ID del libro vendido.
 * @property {Date} fechaVenta - Fecha de la venta.
 * @property {number} precioVenta - Precio de venta del libro.
 * @property {string} [info] - Información adicional de la venta.
 * @property {string} nombreUsuario - Nombre completo del usuario que compró el libro.
 * @property {string} tituloLibro - Título del libro vendido.
 */
export class Venta extends Document {
   // ID del usuario que realiza la venta

   @ApiProperty({
      description: 'ID del usuario que realiza la venta',
      example: 'usuario19@viu.es',
   })
   @Prop({ required: true, type: String })
   idUsuario: string;

   // ID del libro vendido
   @ApiProperty({
      description: 'ID del libro vendido',
      example: '9783161484100',
   })
   @Prop({ required: true, type: String })
   idLibro: string;

   // Fecha de la venta
   @ApiProperty({
      description: 'Fecha de la venta',
      example: '04-01-2025',
   })
   @Prop({
      required: true,
      type: Date,
      // Se establece la hora a las 00:00:00 para evitar problemas con la comparación de fechas
      set: (date: Date) => new Date(date.setHours(0, 0, 0, 0)),
   })
   fechaVenta: Date;

   // Precio de venta del libro
   @ApiProperty({
      description: 'Precio de venta del libro',
      example: 20.5,
   })
   @Prop({ required: true, type: Number })
   precio: number;

   // Información adicional de la venta
   @ApiProperty({
      description: 'Información adicional de la venta',
      example: 'Se aplicó un descuento del 10% en la venta',
   })
   @Prop({ type: String })
   info?: string;

   // Nombre completo del usuario que compró el libro
   @ApiProperty({
      description: 'Nombre completo del usuario que realizó el préstamo',
      example: 'Juan Pérez',
   })
   @Prop({ required: true, type: String })
   nombreUsuario: string;

   // Título del libro vendido
   @ApiProperty({
      description: 'Título del libro prestado',
      example: 'La Odisea',
   })
   @Prop({ required: true, type: String })
   tituloLibro: string;
}

export const VentaSchema = SchemaFactory.createForClass(Venta);
