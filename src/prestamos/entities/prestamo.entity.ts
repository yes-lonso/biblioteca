import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema de Mongoose para la entidad Prestamo.
 * 
 * Esta clase define la estructura de los documentos de préstamos en la base de datos.
 */
@Schema()
export class Prestamo extends Document {
    /**
     * El correo electrónico del usuario asociado con el préstamo.
     * 
     * @example "usuario@ejemplo.com"
     */
    @Prop({ required: true, type: String })
    idUsuario: string;

    /**
     * El ISBN del libro asociado con el préstamo.
     * 
     * @example "9783161484100"
     */
    @Prop({ required: true, type: String })
    idLibro: string;

    /**
     * La fecha en que se realizó el préstamo.
     * 
     * @example "01-10-2023"
     */
    @Prop({ required: true, type: Date, default: Date.now })
    fechaPrestamo: Date;

    /**
     * La fecha en que se debe devolver el libro.
     * 
     * @example "15-10-2023"
     */
    @Prop({ required: true, type: Date })
    fechaDevolucion: Date;

    /**
     * La fecha en que se devolvió realmente el libro.
     * 
     * @example "14-10-2023"
     */
    @Prop({ type: Date })
    fechaDevolucionReal?: Date;
}

export const PrestamoSchema = SchemaFactory.createForClass(Prestamo);

// Se define un índice compuesto único en idUsuario e idLibro
PrestamoSchema.index({ idUsuario: 1, idLibro: 1 }, { unique: true });
