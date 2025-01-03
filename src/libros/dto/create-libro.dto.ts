import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, MinLength, IsNotEmpty, IsPositive, Max, IsISBN } from "class-validator";
import { TransformDate } from "src/common/helpers/date-utils.helpers";

/**
 * Objeto de Transferencia de Datos para crear un nuevo libro.
 * 
 * @class CreateLibroDto
 * 
 * @property {string} isbn - El ISBN del libro. Debe ser una cadena de texto no vacía en formato ISBN-13.
 * @property {string} titulo - El título del libro. Debe ser una cadena de texto no vacía con al menos 1 carácter.
 * @property {string} autor - El autor del libro. Debe ser una cadena de texto no vacía con al menos 1 carácter.
 * @property {number} stock - El stock del libro. Debe ser un número positivo no mayor a 10.
 * @property {string} [genero] - El género del libro. Opcional y debe ser una cadena de texto.
 * @property {Date} [fechaPub] - La fecha de publicación del libro. Opcional y debe ser una fecha válida.
 * @property {string} [resumen] - El resumen del libro. Opcional y debe ser una cadena de texto.
 */
export class CreateLibroDto {    
    @IsNotEmpty({ message: 'La propiedad \'isbn\' es requerida' })
    @IsString({ message: 'El ISBN debe ser una cadena de texto' })
    @IsISBN('13',{ message: 'El valor ISBN debe estar en formato ISBN-13' })    
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
    @TransformDate()
    @IsDate({ message: 'La fecha de publicación debe ser una fecha válida' })
    readonly fechaPub?: Date;

    @IsOptional()
    @IsString({ message: 'El resumen debe ser una cadena de texto' })
    readonly resumen?: string;
}
