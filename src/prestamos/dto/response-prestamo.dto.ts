import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Prestamo } from "../entities/prestamo.entity";
import { Libro } from "src/libros/entities/libro.entity";
import { formatToSpanish } from "src/common/helpers/date-utils.helpers";

/**
 * Data Transfer Object (DTO) para la respuesta de un préstamo.
 * 
 * Esta clase define la estructura de los datos que se devuelven como respuesta al crear o consultar un préstamo.
 */
export class ResponsePrestamoDto {
  prestamo: {
    idUsuario: string;
    idLibro: string;
    fechaPrestamo: string;
    fechaDevolucion: string;
    usuario: {
      nombre: string;
      activo: boolean;
    };
    libro: {
      titulo: string;
      autor: string;
      stock: number;
    };
  };

  /**
   * Constructor para crear una instancia de ResponsePrestamoDto.
   * 
   * @param {Prestamo} prestamo - El objeto de préstamo.
   * @param {Usuario} usuario - El objeto de usuario asociado con el préstamo.
   * @param {Libro} libro - El objeto de libro asociado con el préstamo.
   */
  constructor(prestamo: Prestamo, usuario: Usuario, libro: Libro) {
    // Crear un objeto de respuesta con los datos del préstamo, usuario y libro
    this.prestamo = {
      idUsuario: prestamo.idUsuario,
      idLibro: prestamo.idLibro,
      // Formatear las fechas a un formato en español
      fechaPrestamo: formatToSpanish(prestamo.fechaPrestamo),
      fechaDevolucion: formatToSpanish(prestamo.fechaDevolucion),
      usuario: {
        // Extraer los datos necesarios del usuario
        nombre: usuario.nombreCompleto, // propiedad virtual
        activo: usuario.activo
      },
      libro: {
        titulo: libro.titulo,
        autor: libro.autor,
        stock: libro.stock
      }
    };
  }
}