import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsEmail({}, { message: 'El valor del email debe ser un email válido' })
    @IsNotEmpty({ message: 'La propiedad \'email\' es requerida' })
    readonly email:string;
    
    @IsString({ message: 'El nombre debe ser una cadena de texto' })   
    @MinLength(1, { message: 'El nombre no puede estar vacío' })
    @IsNotEmpty({ message: 'La propiedad \'nombre\' es requerida' }) 
    readonly nombre:string;

    @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
    @MinLength(1, { message: 'El primer apellido no puede estar vacío' })
    @IsNotEmpty({ message: 'La propiedad \'apellido1\' es requerida' })
    readonly apellido1:string;
    
    @IsOptional()
    @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
    readonly apellido2?:string;
    
    @IsOptional()
    @IsBoolean({ message: 'El valor de activo debe ser un booleano' })
    activo:boolean;
}
