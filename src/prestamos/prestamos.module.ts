import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prestamo, PrestamoSchema } from './entities/prestamo.entity';
import { LibrosModule } from 'src/libros/libros.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

/**
 * PrestamosModule es el módulo responsable de gestionar la funcionalidad de préstamos.
 * Importa los módulos necesarios y registra el esquema de Prestamo con Mongoose.
 *
 * @module PrestamosModule
 *
 * @imports
 * - MongooseModule: Registra el esquema de Prestamo con Mongoose.
 * - LibrosModule: Módulo para gestionar libros.
 * - UsuariosModule: Módulo para gestionar usuarios.
 *
 * @controllers
 * - PrestamosController: Maneja las solicitudes HTTP relacionadas con préstamos.
 *
 * @providers
 * - PrestamosService: Contiene la lógica de negocio para préstamos.
 */
@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Prestamo.name, schema: PrestamoSchema },
      ]),
      LibrosModule,
      UsuariosModule,
   ],
   controllers: [PrestamosController],
   providers: [PrestamosService],
})
export class PrestamosModule {}
