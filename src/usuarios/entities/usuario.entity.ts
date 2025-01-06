import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
/**
 * Representa una entidad de usuario con propiedades como email, nombre, apellidos y estado de actividad.
 *
 * @class Usuario
 * @extends Document
 *
 * @property {string} email - El correo electrónico del usuario. Es requerido, único y se almacena en minúsculas.
 * @property {string} nombre - El nombre del usuario. Es requerido.
 * @property {string} apellido1 - El primer apellido del usuario. Es requerido.
 * @property {string} [apellido2] - El segundo apellido del usuario. Es opcional.
 * @property {boolean} [activo] - Indica si el usuario está activo. Por defecto es true.
 */
export class Usuario extends Document {
   @ApiProperty({
      description: 'El correo electrónico del usuario',
      example: 'usuario@example.com',
   })
   @Prop({ required: true, unique: true, trim: true, lowercase: true })
   email: string;

   @ApiProperty({ description: 'El nombre del usuario', example: 'Juan' })
   @Prop({ required: true, trim: true })
   nombre: string;

   @ApiProperty({
      description: 'El primer apellido del usuario',
      example: 'Pérez',
   })
   @Prop({ required: true, trim: true })
   apellido1: string;

   @ApiProperty({
      description: 'El segundo apellido del usuario',
      required: false,
      example: 'García',
   })
   @Prop({ trim: true })
   apellido2: string;

   @ApiProperty({
      description: 'Indica si el usuario está activo',
      required: false,
      example: true,
   })
   @Prop({ default: true })
   activo: boolean;

   /**
    * Propiedad virtual que devuelve el nombre completo del usuario.
    *
    * @returns {string} - El nombre completo del usuario.
    */
   @Virtual({
      get: function (this: Usuario) {
         return `${this.nombre} ${this.apellido1} ${this.apellido2 || ''}`.trim();
      },
   })
   nombreCompleto: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
// Habilitar las propiedades virtuales en el esquema
UsuarioSchema.set('toObject', { virtuals: true });
UsuarioSchema.set('toJSON', { virtuals: true });
