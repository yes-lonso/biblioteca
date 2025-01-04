import { Module } from '@nestjs/common';
import { TestDataService } from './test-data.service';
import { TestDataController } from './test-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/usuarios/entities/usuario.entity';
import { Libro, LibroSchema } from 'src/libros/entities/libro.entity';
import { Prestamo, PrestamoSchema } from 'src/prestamos/entities/prestamo.entity';

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Usuario.name, schema: UsuarioSchema },
      ]),
      MongooseModule.forFeature([{ name: Libro.name, schema: LibroSchema }]),
      MongooseModule.forFeature([{ name: Prestamo.name, schema: PrestamoSchema }]),
   ],
   controllers: [TestDataController],
   providers: [TestDataService],
})
export class TestDataModule {}
