import {
   IsBoolean,
   IsEmail,
   IsNotEmpty,
   IsOptional,
   IsString,
   Min,
   MinLength,
} from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para crear un nuevo usuario.
 *
 * Se utilizan decoradores de validación proporcionados por class-validator
 * @class CreateUsuarioDto
 *
 * @property {string} email - El correo electrónico del usuario. Debe ser un correo válido y es obligatorio.
 * @property {string} nombre - El nombre del usuario. Debe ser una cadena no vacía y es obligatorio.
 * @property {string} apellido1 - El primer apellido del usuario. Debe ser una cadena no vacía y es obligatorio.
 * @property {string} [apellido2] - El segundo apellido del usuario. Debe ser una cadena si se proporciona. Opcional.
 * @property {boolean} [activo] - Indica si el usuario está activo. Debe ser un booleano si se proporciona. Opcional.
 */
export class CreateUsuarioDto {
   @IsEmail({}, { message: 'El valor del email debe ser un email válido' })
   @IsNotEmpty({ message: "La propiedad 'email' es requerida" })
   readonly email: string;

   @IsString({ message: 'El nombre debe ser una cadena de texto' })
   @MinLength(1, { message: 'El nombre no puede estar vacío' })
   @IsNotEmpty({ message: "La propiedad 'nombre' es requerida" })
   readonly nombre: string;

   @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
   @MinLength(1, { message: 'El primer apellido no puede estar vacío' })
   @IsNotEmpty({ message: "La propiedad 'apellido1' es requerida" })
   readonly apellido1: string;

   @IsOptional()
   @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
   readonly apellido2?: string;

   @IsOptional()
   @IsBoolean({ message: 'El valor de activo debe ser un booleano' })
   activo: boolean;
}
