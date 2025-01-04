import { Expose, Transform } from 'class-transformer';
import { formatToSpanish } from 'src/common/helpers/date-utils.helpers';
import { Libro } from '../entities/libro.entity';

/**
 * Objeto de Transferencia de Datos (DTO) para la respuesta de la lista de libros.
 *
 * @class ResponseLibroDto
 *
 * @property {string} mensaje - Mensaje adicional sobre la operación realizada.
 * @property {Libro[]} libros - Lista de libros encontrados.
 */
export class ResponseLibroDto {
   /**
    * Mensaje adicional sobre la operación realizada.
    *
    * @type {string}
    */
   @Expose()
   mensaje: string;

   /**
    * Lista de libros encontrados.
    *
    * @type {Libro[]}
    * @transform Excluye las propiedades `_id`, `__v` y transforma la propiedad `fechaPub` de cada libro.
    */
   @Expose()
   @Transform(({ value }) =>
      value.map((libro: Libro) => {
         // Se desestructura el objeto libro para extraer el _id y la fechaPub
         // Libro.toObject() es una función de Mongoose que convierte el documento en un objeto plano

         // Si el objeto libro es un documento de Mongoose, se convierte en un objeto JavaScript plano
         // útil para manipular el documento sin las propiedades y métodos adicionales que Mongoose añade
         const { _id, __v, fechaPub, ...rest } = libro.toObject
            ? libro.toObject()
            : libro;
         return {
            ...rest,
            fechaPub: fechaPub ? formatToSpanish(fechaPub) : fechaPub,
         };
      }),
   )
   libros: Libro[];

   /**
    * Constructor de la clase ResponseLibroDto.
    *
    * @param {string} mensaje - Mensaje adicional sobre la operación realizada.
    * @param {Libro[]} libros - Lista de libros encontrados.
    */
   constructor(mensaje: string, libros: Libro[]) {
      this.mensaje = mensaje;
      this.libros = libros;
   }
}
