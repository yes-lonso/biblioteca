import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   Query,
} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { FindOneLibroDto } from './dto/findone-libro.dto';
import { Libro } from './entities/libro.entity';
import { ResponseLibroDto } from './dto/response-libro.dto';

@Controller('libros')
/**
 * Controlador para la gestión de libros.
 *
 * Este controlador proporciona endpoints para crear, recuperar, actualizar y eliminar libros.
 */
export class LibrosController {
   /**
    * Crea una instancia de LibrosService.
    *
    * @param {LibrosService} librosService - El servicio utilizado para gestionar libros.
    */
   constructor(private readonly librosService: LibrosService) {}

   /**
    * Crea un nuevo libro.
    *
    * @param {CreateLibroDto} createLibroDto - El objeto de transferencia de datos que contiene los detalles del libro a crear.
    * @returns El libro creado.
    */
   @Post()
   create(@Body() createLibroDto: CreateLibroDto): Promise<ResponseLibroDto> {
      return this.librosService.create(createLibroDto);
   }

   /**
    * Recupera todos los libros.
    *
    * @returns Un array de todos los libros.
    */
   @Get()
   findAll(): Promise<ResponseLibroDto> {
      return this.librosService.findAll();
   }

   /**
    * Recupera un solo libro basado en los parámetros de consulta proporcionados.
    *
    * @param {FindOneLibroDto} findOneLibroDto - El objeto de transferencia de datos que contiene los parámetros de consulta para encontrar el libro.
    * @returns Una promesa que se resuelve con el libro encontrado.
    */
   @Get('buscar')
   findOne(
      @Query() findOneLibroDto: FindOneLibroDto
   ): Promise<ResponseLibroDto> {
      return this.librosService.findOne(findOneLibroDto);
   }

   /**
    * Actualiza un libro existente basado en el ISBN proporcionado.
    *
    * @param {string} isbn - El ISBN del libro a actualizar.
    * @param {UpdateLibroDto} updateLibroDto - El objeto de transferencia de datos que contiene los detalles actualizados del libro.
    * @returns El libro actualizado.
    */
   @Patch(':isbn')
   update(@Param('isbn') isbn: string, @Body() updateLibroDto: UpdateLibroDto) {
      return this.librosService.update(isbn, updateLibroDto);
   }

   /**
    * Elimina un libro basado en el ISBN proporcionado.
    *
    * @param {string} isbn - El ISBN del libro a eliminar.
    * @returns Un mensaje que indica el resultado de la eliminación.
    */
   @Delete(':isbn')
   remove(@Param('isbn') isbn: string): Promise<ResponseLibroDto> {
      return this.librosService.remove(isbn);
   }
}
