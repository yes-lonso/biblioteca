import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, MinLength, IsNotEmpty, IsPositive, Max, IsISBN } from "class-validator";

export class CreateLibroDto {    
    @IsNotEmpty({ message: 'La propiedad \'isbn\' es requerida' })
    @IsString({ message: 'El ISBN debe ser una cadena de texto' })
    @IsISBN("13",{ message: 'El valor ISBN debe estar en formato ISBN-13' })    
    readonly isbn: string;

    @IsNotEmpty({ message: 'La propiedad \'titulo\' es requerida' })
    @IsString({ message: 'El título debe ser una cadena de texto' })
    @MinLength(1, { message: 'El título no puede estar vacío' })
    readonly titulo: string;

    @IsNotEmpty({ message: 'La propiedad \'autor\' es requerida' })
    @IsString({ message: 'El autor debe ser una cadena de texto' })
    @MinLength(1, { message: 'El autor debe tener al menos 1 caracter' })
    readonly autor: string;

    @IsNotEmpty({ message: 'La propiedad \'stock\' es requerida' })
    @IsPositive({ message: 'El stock debe ser un número positivo' })
    @Max(10, { message: 'El stock no puede ser mayor a 10' })
    readonly stock: number;

    @IsOptional()
    @IsString({ message: 'El género debe ser una cadena de texto' })
    readonly genero?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'La fecha de publicación debe ser una fecha válida' })
    readonly fechaPub?: Date;

    @IsOptional()
    @IsString({ message: 'El resumen debe ser una cadena de texto' })
    readonly resumen?: string;
}
