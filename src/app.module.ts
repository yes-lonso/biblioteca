import { Module } from '@nestjs/common'
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LibrosModule,
    UsuariosModule,
    PrestamosModule,
    MongooseModule.forRoot('mongodb+srv://21giin:21giin@giin.ei7gf.mongodb.net/?retryWrites=true&w=majority&appName=GIIN')],
  controllers: [],
  providers: [],
})
export class AppModule { }
