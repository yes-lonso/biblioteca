import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prestamo, PrestamoSchema } from './entities/prestamo.entity';
import { LibrosModule } from 'src/libros/libros.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prestamo.name, schema: PrestamoSchema }]),
    LibrosModule,
    UsuariosModule
  ],
  controllers: [PrestamosController],
  providers: [PrestamosService],
})
export class PrestamosModule {}
