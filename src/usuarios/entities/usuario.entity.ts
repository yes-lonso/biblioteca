import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
   @Prop({ required: true, unique: true, trim: true, lowercase: true })
   email: string;

   @Prop({ required: true, trim: true })
   nombre: string;

   @Prop({ required: true, trim: true })
   apellido1: string;

   @Prop({ trim: true })
   apellido2: string;

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
};

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
// Habilitar las propiedades virtuales en el esquema
UsuarioSchema.set('toObject', { virtuals: true });
UsuarioSchema.set('toJSON', { virtuals: true });

/*
// Habilitar las propiedades virtuales en el esquema y excluir _id, id,  y __v
UsuarioSchema.set('toJSON', {
   virtuals: true, // Habilita las propiedades virtuales en la salida JSON
   versionKey: false, // Excluye la propiedad __v (versión del documento) de la salida JSON
   transform: (doc, ret) => {
      delete ret._id; // Elimina la propiedad _id de la salida JSON
      delete ret.id; // Elimina la propiedad id de la salida JSON
      delete ret.nombre; // Elimina la propiedad nombre de la salida JSON
      delete ret.apellido1; // Elimina la propiedad apellido1 de la salida JSON
      delete ret.apellido2; // Elimina la propiedad apellido2 de la salida JSON
   },
});
*/
