import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class UpdatePrestamoDto {
    @IsString({ message: 'El valor email debe ser una cadena de texto' })
    @IsEmail({}, { message: 'El valor del email debe ser un email válido' })
    @IsNotEmpty({ message: 'La propiedad \'email\' es requerida' })
    readonly idUsuario: string;

    @IsString({ message: 'El valor ISBN debe estar en formato ISBN-13' })
    @MinLength(13, { message: 'El valor ISBN debe tener 13 caracteres' })
    @IsNotEmpty({ message: 'La propiedad \'isbn\' es requerida' })
    readonly idLibro: string;

    @IsDateString({}, { message: 'La fecha de devolución debe ser una fecha válida' })
    @IsNotEmpty({ message: 'La propiedad \'fechaDevolucionReal\' es requerida' })
    readonly fechaDevolucionReal: Date;
}
