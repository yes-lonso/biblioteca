import { Type } from "class-transformer";
import { IsDate, IsISBN, IsOptional, IsString, MinLength, IsNotEmpty } from "class-validator";

export class CreateLibroDto {
    
    @IsISBN('13', { message: 'El valor ISBN debe estar en formato ISBN-13' })
    @IsNotEmpty({ message: 'La propiedad \'isbn\' es requerida' })
    isbn: string;

    @IsString({ message: 'El título debe ser una cadena de texto' })
    @MinLength(1, { message: 'El título no puede estar vacío' })
    @IsNotEmpty({ message: 'La propiedad \'titulo\' es requerida' })
    titulo: string;

    @IsString({ message: 'El autor debe ser una cadena de texto' })
    @MinLength(1, { message: 'El autor debe tener al menos 1 caracter' })
    @IsNotEmpty({ message: 'La propiedad \'autor\' es requerida' })
    autor: string;

    @IsOptional()
    @IsString({ message: 'El género debe ser una cadena de texto' })
    genero?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'La fecha de publicación debe ser una fecha válida' })
    fechaPub?: Date;

    @IsOptional()
    @IsString({ message: 'El resumen debe ser una cadena de texto' })
    resumen?: string;
}
