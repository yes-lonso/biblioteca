import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
   IsDate,
   IsOptional,
   IsString,
   MinLength,
   IsNotEmpty,
   IsPositive,
   Max,
   IsISBN,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { TransformDate } from 'src/common/helpers/date-utils.helpers';

/**
 * Objeto de Transferencia de Datos (DTO) para crear un nuevo libro.
 * Este DTO contiene las propiedades necesarias para crear un libro.
 *
 * @class CreateLibroDto
 *
 * @property {string} isbn - El ISBN del libro. Debe ser una cadena de texto no vacía en formato ISBN-13.
 * @property {string} titulo - El título del libro. Debe ser una cadena válida.
 * @property {string} autor - El autor del libro. Debe ser una cadena válida.
 * @property {number} stock - La cantidad de copias disponibles en stock. Debe ser un número positivo.
 * @property {string} [genero] - El género del libro. Debe ser una cadena válida si se proporciona.
 * @property {Date} [fechaPub] - La fecha de publicación del libro. Debe ser una fecha válida si se proporciona.
 * @property {string} [resumen] - El resumen del libro. Debe ser una cadena válida si se proporciona.
 */
export class CreateLibroDto {
   @ApiProperty({ description: 'El ISBN del libro', example: '9783161484100' })
   @IsNotEmpty({ message: "La propiedad 'isbn' es requerida" })
   @IsString({ message: 'El ISBN debe ser una cadena de texto' })
   @IsISBN('13', { message: 'El valor ISBN debe estar en formato ISBN-13' })
   readonly isbn: string;

   @ApiProperty({ description: 'El título del libro', example: 'Cien Años de Soledad' })
   @IsString({ message: 'El título debe ser una cadena de texto' })
   @IsNotEmpty({ message: 'El título es requerido' })
   readonly titulo: string;

   @ApiProperty({ description: 'El autor del libro', example: 'Gabriel García Márquez' })
   @IsString({ message: 'El autor debe ser una cadena de texto' })
   @MinLength(1, { message: 'El autor debe tener al menos 1 caracter' })
   readonly autor: string;

   @ApiProperty({ description: 'Cantidad de copias disponibles en stock', example: 5 })
   @IsNotEmpty({ message: "La propiedad 'stock' es requerida" })
   @IsPositive({ message: 'El stock debe ser un número positivo' })
   @Max(10, { message: 'El stock no puede ser mayor a 10' })
   readonly stock: number;

   @ApiProperty({ description: 'El género del libro', required: false, example: 'Realismo Mágico' })
   @IsOptional()
   @IsString({ message: 'El género debe ser una cadena de texto' })
   readonly genero?: string;

   @ApiProperty({ description: 'La fecha de publicación del libro', required: false, example: '1967-06-05' })
   @IsOptional()
   @Transform(({ value }) => new Date(value))
   @IsDate({ message: 'La fecha de publicación debe ser una fecha válida' })
   readonly fechaPub?: Date;

   @ApiProperty({ description: 'El resumen del libro', required: false, example: 'Una novela sobre la historia de la familia Buendía en el pueblo ficticio de Macondo.' })
   @IsOptional()
   @IsString({ message: 'El resumen debe ser una cadena de texto' })
   readonly resumen?: string;

   @Exclude()
   readonly id: string;
}
