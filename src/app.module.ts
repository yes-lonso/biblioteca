import { Module } from '@nestjs/common'
import { LibrosModule } from './libros/libros.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DateUtilsService } from './common/helpers/date-utils.helpers';




@Module({
  imports: [
    LibrosModule,
    UsuariosModule,
    PrestamosModule,
    MongooseModule.forRoot('mongodb+srv://giin21:giin21@giin.ei7gf.mongodb.net/biblioteca'),
  ],
  controllers: [],
  providers: [
    DateUtilsService,
    
  ],
})
export class AppModule { }
