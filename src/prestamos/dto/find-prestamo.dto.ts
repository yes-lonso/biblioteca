import { IsEmail, IsOptional, IsString} from 'class-validator';

export class FindPrestamoDto {
  @IsOptional()
  @IsString({ message: 'El ISBN debe ser un número válido' })
  isbn?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
  email?: string;

}