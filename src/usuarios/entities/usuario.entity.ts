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
        get: function (this:Usuario) {            
            return `${this.nombre} ${this.apellido1} ${this.apellido2 || ''}`.trim();
        },
    })
    nombreCompleto: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
