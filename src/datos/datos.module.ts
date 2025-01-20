import { Module } from '@nestjs/common';
import { TestDataService } from './datos.service';
import { TestDataController } from './datos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/usuarios/entities/usuario.entity';
import { Libro, LibroSchema } from 'src/libros/entities/libro.entity';
import {
   Prestamo,
   PrestamoSchema,
} from 'src/prestamos/entities/prestamo.entity';
import { Venta, VentaSchema } from 'src/ventas/entities/venta.entity';

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
      MongooseModule.forFeature([
         { name: Prestamo.name, schema: PrestamoSchema },
      ]),
      MongooseModule.forFeature([{ name: Venta.name, schema: VentaSchema }]),
   ],
   // Registra el controlador TestDataController
   controllers: [TestDataController],
   // Registra el servicio TestDataService
   providers: [TestDataService],
})
export class TestDataModule {}
