import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Objeto de Transferencia de Datos (DTO) para encontrar un solo libro.
 * Este DTO permite filtrar opcionalmente por ISBN, título o autor.
 *
 * @class FindOneLibroDto
 *
 * @property {string} [isbn] - El Número Internacional Normalizado del Libro (ISBN) del libro. Debe ser una cadena válida si se proporciona.
 * @property {string} [titulo] - El título del libro. Debe ser una cadena válida si se proporciona.
 * @property {string} [autor] - El autor del libro. Debe ser una cadena válida si se proporciona.
 *
 * @decorator `@IsOptional()` - Indica que la propiedad es opcional.
 * @decorator `@IsString({ message: '...' })` - Valida que la propiedad sea una cadena y proporciona un mensaje de error personalizado si la validación falla.
 * @decorator `@ApiProperty({ description: '...', required: false, example: '...' })` - Proporciona metadatos para Swagger.
 */
export class FindOneLibroDto {
   @ApiProperty({ description: 'El ISBN del libro', required: false, example: '9783161484100' })
   @IsOptional()
   @IsString({ message: 'El ISBN debe ser un número válido' })
   isbn?: string;

   @ApiProperty({ description: 'El título del libro', required: false, example: 'Cien Años de Soledad' })
   @IsOptional()
   @IsString({ message: 'El título debe ser una cadena de texto' })
   titulo?: string;

   @ApiProperty({ description: 'El autor del libro', required: false, example: 'Gabriel García Márquez' })
   @IsOptional()
   @IsString({ message: 'El autor debe ser una cadena de texto' })
   autor?: string;
}
