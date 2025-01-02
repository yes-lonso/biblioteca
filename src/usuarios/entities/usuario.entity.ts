import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Usuario extends Document{
    @Prop({required:true,unique:true,trim:true,lowercase:true})
    email:string;    

    @Prop({required:true,trim:true})
    nombre:string;
    
    @Prop({required:true,trim:true})
    apellido1:string;   
    
    @Prop({trim:true})
    apellido2:string;    
    
    @Prop({required:true,trim:true})
    activo:boolean;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
