import { formatToSpanish } from 'src/common/helpers/date-utils.helpers';
import { Libro } from '../entities/libro.entity';

/**
 * Objeto de Transferencia de Datos (DTO) para la respuesta de creación de un libro.
 * 
 * Esta clase define la estructura de los datos que se devuelven como respuesta al crear un libro.
 */
export class ResponseLibroDto {
  info: string;
  libros: Partial<Libro[]>;

  constructor(info: string, libros: Libro[]) {
    // Se omite el _id y __v de cada libro en la lista
    this.info = info;
    this.libros = libros.map((item) => {
      const { _id, __v, fechaPub, ...libro } = item.toObject();
      if (fechaPub) {
        libro.fechaPub = formatToSpanish(fechaPub);
      }
      return libro;
    });
    
  }
}
