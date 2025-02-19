import {
   IsEmail,
   IsNotEmpty,
   IsNumber,
   IsPositive,
   Max,
   MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Objeto de Transferencia de Datos (DTO) para crear un nuevo préstamo.
 * Este DTO contiene las propiedades necesarias para crear un préstamo.
 *
 * @class CreatePrestamoDto
 *
 * @property {string} idUsuario - El ID del usuario que realiza el préstamo.
 * - Debe ser un email válido.
 *
 * @property {string} idLibro - El ID del libro a prestar.
 * - Debe ser una cadena de texto no vacía.
 * - Debe estar en formato ISBN-13 con exactamente 13 caracteres.
 *
 * @property {number} diasPrestamo - El número de días del préstamo.
 * - Debe ser un número no vacío.
 * - Debe ser un número positivo.
 */
export class CreatePrestamoDto {
   @ApiProperty({
      description: 'El ID del usuario que realiza el préstamo',
      example: 'usuario1@viu.es',
   })
   @IsEmail(
      {},
      { message: 'El valor del idUsuario debe contener un email válido' },
   )
   readonly idUsuario: string;

   @ApiProperty({
      description: 'El ID del libro a prestar en formato ISBN-13',
      example: '9763161484100',
   })
   @MinLength(13, { message: 'El valor ISBN debe estar en formato ISBN-13' })
   readonly idLibro: string;

   @ApiProperty({ description: 'El número de días del préstamo', example: 14 })
   @IsNumber({}, { message: 'El valor de días de préstamo debe ser un número' })
   @IsPositive({
      message: 'El valor de días de préstamo debe ser un número positivo',
   })
   @IsNotEmpty({ message: "La propiedad 'diasPrestamo' es requerida" })
   @Max(15, { message: 'El valor de días de préstamo no puede ser mayor a 15' })
   readonly diasPrestamo: number;
}
