import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para la entidad "Usuario".
 * 
 * Utiliza decoradores de class-transformer para exponer o excluir propiedades.
 * Todas las propiedades marcadas con @Expose son enviadas al cliente.
 */
export class ResponseUsuarioDto {
  /**
   * Identificador único del usuario (excluido de la respuesta).
   */
  @Exclude()
  _id: string;

  @Exclude()
  __v: number;

  /**
   * Correo electrónico del usuario. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario19@viu.es' })
  @Expose()
  email: string;

  /**
   * Nombre del usuario. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Nombre del usuario', example: 'Javier Lorenzo' })
  @Expose()
  nombre: string;

  /**
   * Primer apellido del usuario. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Primer apellido del usuario', example: 'Alonso' })
  @Expose()
  apellido1: string;

  /**
   * Segundo apellido del usuario (opcional). Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Segundo apellido del usuario', required: false, example: 'Moirón' })
  @Expose()
  apellido2?: string;

  /**
   * Nombre completo del usuario. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Javier Lorenzo Alonso Moirón' })
  @Expose()
  nombreCompleto: string;

  /**
   * Estado de actividad del usuario. Se expone en la respuesta.
   */
  @ApiProperty({ description: 'Estado de actividad del usuario', example: true })
  @Expose()
  activo: boolean;
}
