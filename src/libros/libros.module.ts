import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Libro, LibroSchema } from './entities/libro.entity';

/**
 * El `LibrosModule` es un módulo que encapsula la funcionalidad relacionada con los libros en la aplicación.
 *
 * @module
 *
 * @description
 * Este módulo importa el `MongooseModule` y lo configura con el esquema `Libro`. También proporciona
 * el `LibrosController` y el `LibrosService` para manejar la lógica de negocio y las solicitudes HTTP relacionadas con los libros.
 *
 * @imports
 * - `MongooseModule.forFeature([{ name: Libro.name, schema: LibroSchema }])`: Registra el esquema `Libro` con Mongoose.
 *
 * @controllers
 * - `LibrosController`: Maneja las solicitudes HTTP entrantes relacionadas con los libros.
 *
 * @providers
 * - `LibrosService`: Contiene la lógica de negocio para la gestión de libros.
 *
 * @exports
 * - `MongooseModule`: Exporta el `MongooseModule` configurado para su uso en otros módulos.
 */
@Module({
   controllers: [LibrosController],
   providers: [LibrosService],
   imports: [
      MongooseModule.forFeature([{ name: Libro.name, schema: LibroSchema }]),
   ],
   exports: [MongooseModule],
})
export class LibrosModule {}
