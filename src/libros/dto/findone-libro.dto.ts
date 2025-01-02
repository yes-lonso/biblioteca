import { IsOptional, IsString, IsISBN} from 'class-validator';

export class FindOneLibroDto {
  @IsOptional()
  @IsISBN('13', { message: 'El ISBN debe ser un número válido' })
  isbn?: string;

  @IsOptional()
  @IsString({ message: 'El título debe ser una cadena de texto' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'El autor debe ser una cadena de texto' })
  autor?: string;
}
