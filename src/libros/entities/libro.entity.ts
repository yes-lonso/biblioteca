
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Libro extends Document {
    @Prop({required:true,unique:true,trim:true,lowercase:true})
    isbn:string;
    @Prop({required:true,trim:true,})
    titulo:string;
    @Prop({required:true,trim:true,})
    autor:string;   
    @Prop({trim:true}) 
    genero?:string;
    @Prop({type:Date})
    fechaPub?:Date;
    @Prop({trim:true})
    resumen?:string;
}

export const LibroSchema = SchemaFactory.createForClass(Libro);
