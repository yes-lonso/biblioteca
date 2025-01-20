import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Venta, VentaSchema } from './entities/venta.entity';
import { LibrosModule } from 'src/libros/libros.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PrestamosModule } from 'src/prestamos/prestamos.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Venta.name, schema: VentaSchema }]),
      LibrosModule,
      UsuariosModule,
      PrestamosModule,
   ],
   controllers: [VentasController],
   providers: [VentasService],
})
export class VentasModule {}
