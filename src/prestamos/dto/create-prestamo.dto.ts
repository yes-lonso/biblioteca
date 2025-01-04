import {
   IsEmail,
   IsNotEmpty,
   IsNumber,
   IsPositive,
   IsString,
   MinLength,
} from 'class-validator';

/**
 * Objeto de Transferencia de Datos para crear un nuevo préstamo.
 *
 * @class CreatePrestamoDto
 *
 * @property {string} idUsuario - El ID del usuario que solicita el préstamo.
 * - Debe ser una cadena de texto no vacía.
 * - Debe tener un formato de correo electrónico válido.
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
   @IsString({ message: 'El valor email debe ser una cadena de texto' })
   @IsEmail({}, { message: 'El valor del email debe ser un email válido' })
   @IsNotEmpty({ message: "La propiedad 'email' es requerida" })
   readonly idUsuario: string;

   @IsString({ message: 'El valor ISBN debe estar en formato ISBN-13' })
   @MinLength(13, { message: 'El valor ISBN debe tener 13 caracteres' })
   @IsNotEmpty({ message: "La propiedad 'isbn' es requerida" })
   readonly idLibro: string;

   @IsNumber({}, { message: 'El valor de días de préstamo debe ser un número' })
   @IsPositive({
      message: 'El valor de días de préstamo debe ser un número positivo',
   })
   @IsNotEmpty({ message: "La propiedad 'diasPrestamo' es requerida" })
   readonly diasPrestamo: number;
}
