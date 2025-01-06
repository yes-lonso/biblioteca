import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

/**
 * Data Transfer Object (DTO) para actualizar un préstamo.
 *
 * Esta clase define la estructura de los datos necesarios para generar la devolución de un préstamo.
 */
export class UpdatePrestamoDto {
   /**
    * La clave de usuario (correo electrónico) asociado con el préstamo.
    *
    * @example "usuarioX@viu.es"
    */
   @ApiProperty({ description: 'El correo electrónico del usuario asociado con el préstamo', example: 'usuario?@viu.es' })
   @IsString({ message: 'El valor email debe ser una cadena de texto' })
   @IsEmail({}, { message: 'El valor del email debe ser un email válido' })
   @IsNotEmpty({ message: "La propiedad 'email' es requerida" })
   readonly idUsuario: string;

   /**
    * La clave de libro (ISBN) asociado con el préstamo.
    *
    * @example "9783161484100"
    */
   @ApiProperty({ description: 'El ISBN del libro asociado con el préstamo', example: '9783161484100' })
   @IsString({ message: 'El valor ISBN debe estar en formato ISBN-13' })
   @MinLength(13, { message: 'El valor ISBN debe tener 13 caracteres' })
   @IsNotEmpty({ message: "La propiedad 'isbn' es requerida" })
   readonly idLibro: string;

   /**
    * La fecha de devolución del préstamo.
    *
    * @example "04-01-2025"
    */
   @ApiProperty({ description: 'La fecha de devolución del préstamo', required: false, example: '04-01-2025' })
   @IsOptional()
   @Transform(({ value }) => new Date(value))
   @IsDate({ message: 'La fecha de devolución debe ser una fecha válida' })
   readonly fechaDevolucionReal?: Date;
}
