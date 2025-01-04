import { Expose, Transform } from 'class-transformer';
import { Usuario } from '../entities/usuario.entity';

/**
 * Objeto de Transferencia de Datos (DTO) para la respuesta de la lista de usuarios.
 *
 * @class ResponseUsuarioDto
 *
 * @property {string} mensaje - Mensaje adicional sobre la operación realizada.
 * @property {Usuario[]} usuarios - Lista de usuarios encontrados.
 */
export class ResponseUsuarioDto {
   /**
    * Mensaje adicional sobre la operación realizada.
    *
    * @type {string}
    */
   @Expose()
   mensaje: string;

   /**
    * Lista de usuarios encontrados.
    *
    * @type {Usuario[]}
    * @transform Excluye la propiedad `_id` de cada usuario.
    */
   @Expose()
   @Transform(({ value }) =>
      value.map((usuario: Usuario) => {
         // Se desestructura el objeto usuario para extraer el _id
         // Usuario.toObject() es una función de Mongoose que convierte el documento en un objeto plano

         // Si el objeto usuario es un documento de Mongoose, se convierte en un objeto JavaScript plano
         // útil para manipular el documento sin las propiedades y métodos adicionales que Mongoose añade
         const { _id, __v, id, nombre, apellido1, apellido2, ...rest } =
            usuario.toObject ? usuario.toObject() : usuario;
            console.log('rest', rest);
         return rest
      }),
   )
   usuarios: Usuario[];

   /**
    * Constructor de la clase ResponseUsuarioDto.
    *
    * @param {string} mensaje - Mensaje adicional sobre la operación realizada.
    * @param {Usuario[]} usuarios - Lista de usuarios encontrados.
    */
   constructor(mensaje: string, usuarios: Usuario[]) {
      this.mensaje = mensaje;
      this.usuarios = usuarios;
   }
}
