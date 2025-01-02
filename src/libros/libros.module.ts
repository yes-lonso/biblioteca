import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Libro, LibroSchema } from './entities/libro.entity';


@Module({
  controllers: [LibrosController],
  providers: [LibrosService],
  imports: [MongooseModule.forFeature([{ name: Libro.name, schema: LibroSchema }])],
  exports: [MongooseModule],
})
export class LibrosModule {}
