import { Module } from '@nestjs/common';
import { TestDataService } from './test-data.service';
import { TestDataController } from './test-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/usuarios/entities/usuario.entity';
import { Libro, LibroSchema } from 'src/libros/entities/libro.entity';
import { Prestamo, PrestamoSchema } from 'src/prestamos/entities/prestamo.entity';

/**
 * Módulo para manejar los datos de prueba.
 * 
 * Este módulo importa los esquemas de Mongoose para Usuario, Libro y Prestamo,
 * y registra el controlador y el servicio correspondientes.
 */
@Module({
   imports: [
      // Importa los esquemas de Mongoose para Usuario, Libro y Prestamo
      MongooseModule.forFeature([
         { name: Usuario.name, schema: UsuarioSchema },
      ]),
      MongooseModule.forFeature([{ name: Libro.name, schema: LibroSchema }]),
      MongooseModule.forFeature([{ name: Prestamo.name, schema: PrestamoSchema }]),
   ],
   // Registra el controlador TestDataController
   controllers: [TestDataController],
   // Registra el servicio TestDataService
   providers: [TestDataService],
})
export class TestDataModule {}
