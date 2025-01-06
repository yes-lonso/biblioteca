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
import { ResponseLibroDto } from './dto/response-libro.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('libros')
@Controller('libros')

/**
 * Controlador para gestionar las operaciones relacionadas con los libros.
 *
 * @class
 * @description Este controlador maneja las solicitudes HTTP para crear, obtener, actualizar y eliminar libros.
 * Utiliza el servicio `LibrosService` para realizar las operaciones necesarias.
 *
 * @swagger
 * tags:
 *   name: Libros
 *   description: Operaciones relacionadas con los libros
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
   @ApiOperation({ summary: 'Crea un nuevo libro' })
   @ApiResponse({
      status: 201,
      description: 'El libro ha sido creado con éxito.',
   })
   @ApiResponse({
      status: 400,
      description: 'Datos proporcionados no válidos.',
   })
   create(@Body() createLibroDto: CreateLibroDto): Promise<ResponseLibroDto> {
      return this.librosService.create(createLibroDto);
   }

   /**
    * Recupera todos los libros.
    *
    * @returns Un array de todos los libros.
    */
   @Get()
   @ApiOperation({ summary: 'Obtener todos los libros' })
   @ApiResponse({
      status: 200,
      description: 'Lista de libros.',
      type: [ResponseLibroDto],
   })
   findAll(): Promise<ResponseLibroDto[]> {
      return this.librosService.findAll();
   }

   /**
    * Recupera un solo libro basado en los parámetros de consulta proporcionados.
    *
    * @param {FindOneLibroDto} findOneLibroDto - El objeto de transferencia de datos que contiene los parámetros de consulta para encontrar el libro.
    * @returns Una promesa que se resuelve con el libro encontrado.
    */
   @Get('buscar')
   @ApiOperation({ summary: 'Buscar un libro' })
   @ApiResponse({
      status: 200,
      description: 'Libro encontrado.',
      type: ResponseLibroDto,
   })
   @ApiResponse({
      status: 404,
      description: 'Libro no encontrado.',
   })
   findOne(
      @Query() findOneLibroDto: FindOneLibroDto,
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
   @ApiOperation({ summary: 'Actualizar un libro por ISBN' })
   @ApiResponse({
      status: 200,
      description: 'El libro ha sido actualizado.',
      type: ResponseLibroDto,
   })
   @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
   update(
      @Param('isbn') isbn: string,
      @Body() updateLibroDto: UpdateLibroDto,
   ): Promise<ResponseLibroDto> {
      return this.librosService.update(isbn, updateLibroDto);
   }

   /**
    * Elimina un libro basado en el ISBN proporcionado.
    *
    * @param {string} isbn - El ISBN del libro a eliminar.
    * @returns Un mensaje que indica el resultado de la eliminación.
    */
   @Delete(':isbn')
   @ApiOperation({ summary: 'Eliminar un libro por ISBN' })
   @ApiResponse({
      status: 200,
      description: 'El libro ha sido eliminado.',
      type: ResponseLibroDto,
   })
   @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
   remove(@Param('isbn') isbn: string): Promise<ResponseLibroDto> {
      return this.librosService.remove(isbn);
   }
}
