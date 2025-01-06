import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

/**
 * Objeto de Transferencia de Datos (DTO) para actualizar un usuario.
 *
 * Este DTO extiende de CreateUsuarioDto y hace que todas las propiedades sean opcionales.
 * Utiliza el decorador PartialType de @nestjs/swagger para generar la documentación de Swagger.
 */
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
