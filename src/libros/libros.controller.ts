import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { FindOneLibroDto } from './dto/findone-libro.dto';
import { Libro } from './entities/libro.entity';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {    
    return this.librosService.create(createLibroDto);
  }

  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  @Get('buscar')
  findOne(@Query() findOneLibroDto: FindOneLibroDto): Promise<Libro> {
    return this.librosService.findOne(findOneLibroDto);
  }

  @Patch(':isbn')
  update(@Param('isbn') isbn: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(isbn, updateLibroDto);
  }

  @Delete(':isbn')
  remove(@Param('isbn') isbn: string) {
    return this.librosService.remove(isbn);
  }
}
