import { IsOptional, IsString} from 'class-validator';

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
 */
export class FindOneLibroDto {
  @IsOptional()
  @IsString({ message: 'El ISBN debe ser un número válido' })
  isbn?: string;

  @IsOptional()
  @IsString({ message: 'El título debe ser una cadena de texto' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'El autor debe ser una cadena de texto' })
  autor?: string;
}
