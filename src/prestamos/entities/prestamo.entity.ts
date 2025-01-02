import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Prestamo extends Document {
    // idUsuario e idLibro son referencias a los documentos de Usuario y Libro
    
    @Prop({ required: true, type: String, ref: 'Usuario' })
    idUsuario: string;

    @Prop({ required: true, type: String, ref: 'Libro' })
    idLibro: string;

    @Prop({ required: true, type: Date, default: Date.now })
    fechaPrestamo: Date;

    @Prop({ required: true, type: Date })
    fechaDevolucion: Date;

    @Prop({ type: Date })
    fechaDevolucionReal?: Date;
}

export const PrestamoSchema = SchemaFactory.createForClass(Prestamo);

// Se define un índice compuesto único en idUsuario e idLibro
PrestamoSchema.index({ idUsuario: 1, idLibro: 1 }, { unique: true });
