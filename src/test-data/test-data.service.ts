import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Libro } from 'src/libros/entities/libro.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { usuarios, libros } from './test-data';

/**
 * Servicio para manejar las operaciones relacionadas con los datos de prueba.
 */
@Injectable()
export class TestDataService {
   /**
    * Construye una nueva instancia de TestDataService.
    * @param usuariosModel - El modelo de Mongoose para los usuarios.
    * @param librosModel - El modelo de Mongoose para los libros.
    * @param prestamosModel - El modelo de Mongoose para los préstamos.
    */
   constructor(
      @InjectModel(Usuario.name)
      private readonly usuariosModel: Model<Usuario>,

      @InjectModel(Libro.name)
      private readonly librosModel: Model<Libro>,

      @InjectModel(Prestamo.name)
      private readonly prestamosModel: Model<Prestamo>
   ) {}

   /**
    * Carga los datos de prueba en la base de datos.
    * 
    * Este método elimina todos los documentos existentes en las colecciones de usuarios, libros y préstamos,
    * y luego inserta los datos de prueba.
    * 
    * @returns Un mensaje indicando el resultado de la carga de datos.
    */
   async loadData(): Promise<string> {
      try {
         // Elimina todos los documentos existentes en las colecciones de usuarios, libros y préstamos
         await this.usuariosModel.deleteMany({});
         await this.librosModel.deleteMany({});
         await this.prestamosModel.deleteMany({});

         // Inserta los datos de prueba en las colecciones de usuarios y libros
         await this.usuariosModel.insertMany(usuarios);
         await this.librosModel.insertMany(libros);

         return 'Datos de prueba cargados exitosamente';
      } catch (error) {
         throw new Error('Error al cargar los datos de prueba');
      }
   }
}
