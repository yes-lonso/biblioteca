import { Module } from '@nestjs/common';
import { TestDataService } from './test-data.service';
import { TestDataController } from './test-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/usuarios/entities/usuario.entity';
import { Libro, LibroSchema } from 'src/libros/entities/libro.entity';

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Usuario.name, schema: UsuarioSchema },
      ]),
      MongooseModule.forFeature([{ name: Libro.name, schema: LibroSchema }]),
   ],
   controllers: [TestDataController],
   providers: [TestDataService],
})
export class TestDataModule {}
