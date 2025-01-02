
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Libro extends Document {
    @Prop({required:true,unique:true,type:String, trim:true,lowercase:true})
    isbn:string;
    @Prop({required:true,type:String, trim:true,})
    titulo:string;
    @Prop({required:true,type:String, trim:true,})
    autor:string;   
    @Prop({type: Number, default: 1})
    stock: number;
    
    // Se añaden los propiedades opcionales genero, fechaPub y resumen
    @Prop({type: String, trim:true}) 
    genero?:string;
    @Prop({type:Date})
    fechaPub?:Date;
    @Prop({type: String,trim:true})
    resumen?:string;
}

export const LibroSchema = SchemaFactory.createForClass(Libro);
