
import { PartialType } from '@nestjs/swagger';
import { CreateLibroDto } from './create-libro.dto';

/**
 * Objeto de Transferencia de Datos (DTO) para actualizar un libro.
 *
 * Esta clase extiende PartialType de CreateLibroDto,
 * lo que significa que hereda todas las propiedades de CreateLibroDto
 * pero las hace opcionales. Esto es útil para operaciones de actualización
 * donde no es necesario proporcionar todos los campos.
 */
export class UpdateLibroDto extends PartialType(CreateLibroDto) {}
