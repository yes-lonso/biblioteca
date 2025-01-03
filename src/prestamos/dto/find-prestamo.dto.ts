import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoPrestamo } from '../enums/estado-prestamo';

/**
 * Data Transfer Object (DTO) para buscar préstamos.
 * 
 * Esta clase define los criterios de búsqueda opcionales para encontrar registros de préstamos.
 */
export class FindPrestamoDto {
  /**
   * El ISBN del libro asociado con el préstamo.
   * 
   * @example "9783161484100"
   */
  @IsOptional()
  @IsString({ message: 'El ISBN debe ser un número válido' })
  idLibro?: string;

  /**
   * El correo electrónico del usuario asociado con el préstamo.
   * 
   * @example "usuarioX@viu.es"
   */
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
  @IsEnum(EstadoPrestamo, { message: 'El estado debe ser uno de los siguientes valores: "todos", "prestados" o "devueltos"' })  
  estado?: string = EstadoPrestamo.TODOS
}