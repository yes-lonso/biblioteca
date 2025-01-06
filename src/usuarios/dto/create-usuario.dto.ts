import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
   @ApiProperty({ description: 'El correo electrónico del usuario', example: 'usuario@example.com' })
   @IsEmail({}, { message: 'El valor del email debe ser un email válido' })
   @IsNotEmpty({ message: "La propiedad 'email' es requerida" })
   readonly email: string;

   @ApiProperty({ description: 'El nombre del usuario', example: 'Juan' })
   @IsString({ message: 'El nombre debe ser una cadena de texto' })
   @MinLength(1, { message: 'El nombre no puede estar vacío' })
   @IsNotEmpty({ message: "La propiedad 'nombre' es requerida" })
   readonly nombre: string;

   @ApiProperty({ description: 'El primer apellido del usuario', example: 'Pérez' })
   @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
   @MinLength(1, { message: 'El primer apellido no puede estar vacío' })
   @IsNotEmpty({ message: "La propiedad 'apellido1' es requerida" })
   readonly apellido1: string;

   @ApiProperty({ description: 'El segundo apellido del usuario', required: false, example: 'García' })
   @IsOptional()
   @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
   readonly apellido2?: string;

   @ApiProperty({ description: 'Indica si el usuario está activo', required: false, example: true })
   @IsOptional()
   activo?: boolean;
}
