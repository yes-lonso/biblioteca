import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
   IsOptional,
   IsString,
   MinLength,
   IsNotEmpty,
   IsPositive,
   IsISBN,
   Max,
} from 'class-validator';
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
 * @property {double} precio - El precio del libro. Es requerido. Debe ser un número positivo.
 * @property {Date} fechaCompra - La fecha de compra del libro. Debe ser una fecha válida.
 * @property {string} [genero] - El género del libro. Debe ser una cadena válida si se proporciona.
 * @property {Date} [fechaPub] - La fecha de publicación del libro. Debe ser una fecha válida si se proporciona.
 * @property {string} [resumen] - El resumen del libro. Debe ser una cadena válida si se proporciona.
 * @property {string} id - El identificador único del libro.
 */
export class CreateLibroDto {
   @ApiProperty({ description: 'El ISBN del libro', example: '9783389130988' })
   @IsNotEmpty({ message: "La propiedad 'isbn' es requerida" })
   @IsString({ message: 'El ISBN debe ser una cadena de texto' })
   @IsISBN('13', { message: 'El valor ISBN debe estar en formato ISBN-13' })
   readonly isbn: string;

   @ApiProperty({
      description: 'El título del libro',
      example: 'El Eco de los Recuerdos',
   })
   @IsString({ message: 'El título debe ser una cadena de texto' })
   @IsNotEmpty({ message: 'El título es requerido' })
   readonly titulo: string;

   @ApiProperty({ description: 'El autor del libro', example: 'Clara Torres' })
   @IsString({ message: 'El autor debe ser una cadena de texto' })
   @MinLength(1, { message: 'El autor debe tener al menos 1 caracter' })
   readonly autor: string;

   @ApiProperty({
      description: 'Cantidad de ejemplares disponibles en stock',
      example: 5,
   })
   @IsNotEmpty({ message: "La propiedad 'stock' es requerida" })
   @IsPositive({ message: 'El stock debe ser un número positivo' })
   @Max(10, { message: 'El stock no puede superar los 10 ejemplares' })
   readonly stock: number;

   @ApiProperty({
      description: 'El precio del libro',
      example: 25.99,
   })
   @IsNotEmpty({ message: "La propiedad 'precio' es requerida" })
   @IsPositive({ message: 'El precio debe ser un número positivo' })
   readonly precio: number;

   @ApiProperty({
      description: 'La fecha de compra del libro',
      example: '20-07-2021',
   })
   @TransformDate({ message: 'La fecha debe estar en el formato DD-MM-YYYY' })
   readonly fechaCompra: Date;

   @ApiProperty({
      description: 'El género del libro',
      required: false,
      example: 'Drama',
   })
   @IsOptional()
   @IsString({ message: 'El género debe ser una cadena de texto' })
   readonly genero?: string;

   @ApiProperty({
      description: 'La fecha de publicación del libro',
      required: false,
      example: '20-07-2021',
   })
   @IsOptional()
   @TransformDate({ message: 'La fecha debe estar en el formato DD-MM-YYYY' })
   readonly fechaPub?: Date;

   @ApiProperty({
      description: 'El resumen del libro',
      required: false,
      example:
         'Una mujer regresa a su ciudad natal tras muchos años para enfrentar los recuerdos de su infancia y descubrir secretos ocultos de su familia. En cada rincón, resuenan las voces del pasado que la llevarán a un inesperado desenlace.',
   })
   @IsOptional()
   @IsString({ message: 'El resumen debe ser una cadena de texto' })
   readonly resumen?: string;

   @Exclude()
   readonly id: string;
}
