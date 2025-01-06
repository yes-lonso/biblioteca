import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { TestDataModule } from './test-data/test-data.module';

/**
 * Módulo raíz de la aplicación.
 *
 * @module AppModule
 */
@Module({
   // Importa otros módulos necesarios para la aplicación
   imports: [
      // Conexión a la base de datos MongoDB
      MongooseModule.forRoot(
         'mongodb+srv://giin21:giin21@giin.ei7gf.mongodb.net/biblioteca'
      ),
      // Servir archivos estáticos desde la carpeta 'public'
      ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
      // Importa el módulo de libros
      LibrosModule,
      // Importa el módulo de usuarios
      UsuariosModule,
      // Importa el módulo de préstamos
      PrestamosModule,
      // Importa el módulo de datos de prueba
      TestDataModule,
   ],
   // No hay controladores en el módulo raíz
   controllers: [],
   // No hay proveedores en el módulo raíz
   providers: [],
})
export class AppModule {}
