import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Prestamo } from "../entities/prestamo.entity";
import { Libro } from "src/libros/entities/libro.entity";

export class PrestamoResponseDto {
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
    constructor(prestamo: Prestamo, usuario: Usuario, libro: Libro) {
        this.prestamo = {
            idUsuario: prestamo.idUsuario,
            idLibro: prestamo.idLibro,
            fechaPrestamo: prestamo.fechaPrestamo.toISOString(),
            fechaDevolucion: prestamo.fechaDevolucion.toISOString(),
            usuario: {
                nombre: usuario.nombre + " " + usuario.apellido1,                
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