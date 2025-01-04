import { Exclude, Expose } from 'class-transformer';

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

  @Expose()
  email: string;

  /**
   * Primer apellido del usuario (excluido de la respuesta).
   */
  @Exclude()
  apellido1: string;

  /**
   * Segundo apellido del usuario (excluido de la respuesta).
   */
  @Exclude()
  apellido2: string;

  /**
   * Nombre completo del usuario. Se expone en la respuesta.
   */
  @Expose()
  nombreCompleto: string;

  /**
   * Estado de actividad del usuario. Se expone en la respuesta.
   */
  @Expose()
  activo: boolean;
}
