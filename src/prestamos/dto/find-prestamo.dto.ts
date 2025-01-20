import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoPrestamo } from '../enums/estado-prestamo';


/**
 * Objeto de Transferencia de Datos (DTO) para encontrar préstamos.
 * Este DTO permite filtrar opcionalmente por usuario y estado del préstamo.
 *
 * @class FindPrestamoDto
 * @property {string} [idLibro] - El ISBN del libro asociado con el préstamo.
 * @property {string} [idUsuario] - El correo electrónico del usuario asociado con el préstamo.
 * @property {EstadoPrestamo} [estado] - El estado del préstamo (todos, prestados, devueltos).
 */
export class FindPrestamoDto {
   /**
    * El ISBN del libro asociado con el préstamo.
    *
    * @example "9783161484100"
    */
   @ApiProperty({ description: 'El ISBN del libro asociado con el préstamo', required: false, example: '9783161484100' })
   @IsOptional()
   @IsString({ message: 'El ISBN debe ser un número válido' })
   idLibro?: string;

   /**
    * El correo electrónico del usuario asociado con el préstamo.
    *
    * @example "usuario?@viu.es"
    */
   @ApiProperty({
      description: 'El correo electrónico del usuario asociado con el préstamo',
      required: false,
      example: 'usuario?@viu.es',
   })
   @IsOptional()
   @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
   idUsuario?: string;

   /**
    * Indica si la consulta debe filtrar todos los préstamos, solo los prestados o solo los devueltos.
    *
    * @example "todos"
    * @example "prestados"
    * @example "devueltos"
    */
   @ApiProperty({
      description: 'El estado del préstamo',
      required: false,
      example: 'todos',
      enum: EstadoPrestamo,
   })
   @IsEnum(EstadoPrestamo, {
      message:
         'El estado debe ser uno de los siguientes valores: "todos", "prestados" o "devueltos"',
   })
   estado?: string = EstadoPrestamo.TODOS;
}
