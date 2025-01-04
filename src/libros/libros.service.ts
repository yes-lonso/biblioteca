import {
   BadRequestException,
   ConflictException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';
import { FindOneLibroDto } from './dto/findone-libro.dto';
import { ResponseLibroDto } from './dto/response-libro.dto';
import { plainToInstance } from 'class-transformer';


/**
 * Servicio para gestionar los libros en la biblioteca.
 *
 * Este servicio proporciona métodos para crear, recuperar, actualizar y eliminar registros de libros.
 *
 * Métodos disponibles:
 *
 * - `create(createLibroDto: CreateLibroDto): Promise<Libro>`: Crea un nuevo libro en la biblioteca.
 * - `findAll(): Promise<Libro[]>`: Recupera todos los registros de libros.
 * - `findOne(findOneLibroDto: FindOneLibroDto): Promise<Libro>`: Recupera un libro basado en criterios de búsqueda.
 * - `update(isbn: string, updateLibroDto: UpdateLibroDto): Promise<Libro>`: Actualiza un registro de libro.
 * - `remove(isbn: string): Promise<Libro>`: Elimina un registro de libro.
 */
@Injectable()
export class LibrosService {
   /**
    * Construye una nueva instancia de LibrosService.
    *
    * @param {Model<Libro>} librosModel - El modelo de Mongoose para la colección de libros.
    */
   constructor(
      @InjectModel(Libro.name)
      private readonly librosModel: Model<Libro>,
   ) {}

   /**
    * Añade un nuevo libro en la biblioteca.
    *
    * @param {CreateLibroDto} createLibroDto - Objeto de transferencia de datos que contiene los detalles del libro a crear.
    * @returns {Promise<Libro>} - Una promesa que se resuelve en el objeto del libro creado.
    * @throws {ConflictException} - Si el libro ya existe.
    * @throws {InternalServerErrorException} - Si hay un error al intentar crear el libro.
    */
   async create(createLibroDto: CreateLibroDto): Promise<ResponseLibroDto> {
      try {
         const libro = await this.librosModel.create(createLibroDto);
         return plainToInstance(ResponseLibroDto, libro, {
            excludeExtraneousValues: true,
         });             
      } catch (error) {
         this.handleError(error, 'Error al intentar crear el libro');
      }
   }

   /**
    * Recupera todos los registros de libros.
    *
    * @returns {Promise<ResponseLibroDto[]>} - Una promesa que se resuelve en una lista de objetos de libros.
    */
   async findAll(): Promise<ResponseLibroDto[]> {
      try {
         const libros = await this.librosModel.find().exec();
         return plainToInstance(ResponseLibroDto, libros, {
            excludeExtraneousValues: true,
         });             
      } catch (error) {
         this.handleError(
            error,
            'Error al intentar consultar todos los libros de la colección',
         );
      }
   }

   /**
    * Recupera un libro basado en criterios de búsqueda.
    *
    * @param {FindOneLibroDto} findOneLibroDto - Objeto de transferencia de datos que contiene los criterios de búsqueda.
    * @returns {Promise<Libro>} - Una promesa que se resuelve en el objeto del libro encontrado.
    * @throws {NotFoundException} - Si no se encuentra ningún libro con los criterios proporcionados.
    * @throws {InternalServerErrorException} - Si hay un error al intentar buscar el libro.
    */
   async findOne(findOneLibroDto: FindOneLibroDto): Promise<ResponseLibroDto> {
      const { isbn, titulo, autor } = findOneLibroDto;

      // Verificar que solo un criterio de búsqueda esté presente
      const criteria = [isbn, titulo, autor].filter(Boolean);
      if (criteria.length !== 1) {
         throw new BadRequestException(
            'Debes proporcionar exactamente un criterio de búsqueda: isbn, titulo o autor',
         );
      }

      try {
         const query: any = {};

         if (isbn) {
            query['isbn'] = isbn;
         }

         if (titulo) {
            query['titulo'] = { $regex: titulo, $options: 'i' };
         }

         if (autor) {
            query['autor'] = { $regex: autor, $options: 'i' };
         }

         const libro = await this.librosModel.findOne(query).exec();
         if (!libro) {
            throw new NotFoundException(
               'No se encontró ningún libro con los criterios proporcionados',
            );
         }
         return plainToInstance(ResponseLibroDto, libro, {
            excludeExtraneousValues: true,
         });             
      } catch (error) {
         this.handleError(error, 'Error al intentar buscar el libro');
      }
   }

   /**
    * Actualiza un registro de libro.
    *
    * @param {string} isbn - El ISBN del libro a actualizar.
    * @param {UpdateLibroDto} updateLibroDto - Objeto de transferencia de datos que contiene los detalles de la actualización.
    * @returns {Promise<Libro>} - Una promesa que se resuelve en el objeto del libro actualizado.
    * @throws {NotFoundException} - Si no se encuentra el libro con el ISBN proporcionado.
    * @throws {InternalServerErrorException} - Si hay un error al intentar actualizar el libro.
    */
   async update(
      isbn: string,
      updateLibroDto: UpdateLibroDto,
   ): Promise<ResponseLibroDto> {
      const libroBD = await this.findOne({ isbn });
      try {
         if (libroBD) {
            const libro = await this.librosModel
               .findOneAndUpdate({ isbn }, updateLibroDto, { new: true })
               .exec();
            return plainToInstance(ResponseLibroDto, libro, { excludeExtraneousValues: true });             
         } else {
            throw new NotFoundException(
               `No se encontró ningún libro con ISBN ${isbn}`,
            );
         }
      } catch (error) {
         this.handleError(error, 'Error al intentar actualizar el libro');
      }
   }

   /**
    * Elimina un registro de libro.
    *
    * @param {string} isbn - El ISBN del libro a eliminar.
    * @returns {Promise<Libro>} - Una promesa que se resuelve en el objeto del libro eliminado.
    * @throws {NotFoundException} - Si no se encuentra el libro con el ISBN proporcionado.
    * @throws {InternalServerErrorException} - Si hay un error al intentar eliminar el libro.
    */
   async remove(isbn: string): Promise<ResponseLibroDto> {
      const libroBD = await this.findOne({ isbn });
      try {
         if (libroBD) {
            const libro = await this.librosModel
               .findOneAndDelete({ isbn })
               .exec();
            return plainToInstance(ResponseLibroDto, libro, {
               excludeExtraneousValues: true,
            });             
         } else {
            throw new NotFoundException(
               `No se encontró ningún libro con ISBN ${isbn}`,
            );
         }
      } catch (error) {
         this.handleError(error, 'Error al intentar eliminar el libro');
      }
   }

   /**
    * Maneja los errores lanzados por las operaciones de la base de datos.
    *
    * @param {any} error - El error lanzado por la operación de la base de datos.
    * @throws {ConflictException} - Si el error es un conflicto de duplicados.
    * @throws {InternalServerErrorException} - Si hay un error interno del servidor.
    */
   private handleError(error: any, errorMsg: string): void {
      if (error.code === 11000) {
         throw new ConflictException('¡El libro ya existe!');
      } else if (
         error instanceof NotFoundException ||
         error instanceof BadRequestException
      ) {
         throw error;
      } else {
         throw new InternalServerErrorException(errorMsg);
      }
   }
}
