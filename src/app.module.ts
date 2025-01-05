import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { TestDataModule } from './test-data/test-data.module';

@Module({
   imports: [
      MongooseModule.forRoot(
         'mongodb+srv://giin21:giin21@giin.ei7gf.mongodb.net/biblioteca'
      ),
      ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
      LibrosModule,
      UsuariosModule,
      PrestamosModule,
      TestDataModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
