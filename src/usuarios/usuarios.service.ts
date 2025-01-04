import {
   BadRequestException,
   ConflictException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { ResponseUsuarioDto } from './dto/response-usuario.dto';
import { plainToInstance } from 'class-transformer';

/**
 * Servicio para gestionar las operaciones relacionadas con los usuarios.
 *
 * @class UsuariosService
 */
@Injectable()
export class UsuariosService {
   constructor(
      @InjectModel(Usuario.name)
      private readonly usuariosModel: Model<Usuario>,
   ) {}

   /**
    * Crea un nuevo usuario.
    *
    * @param {CreateUsuarioDto} createUsuarioDto - Objeto de transferencia de datos que contiene los detalles del usuario a crear.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario creado.
    * @throws {ConflictException} - Si el usuario ya existe.
    * @throws {InternalServerErrorException} - Si hay un error al intentar crear el usuario.
    */
   async create(
      createUsuarioDto: CreateUsuarioDto,
   ): Promise<ResponseUsuarioDto> {
      try {
         const usuario = await this.usuariosModel.create(createUsuarioDto);
         return plainToInstance(ResponseUsuarioDto, usuario, {
            excludeExtraneousValues: true,
         });
      } catch (error) {
         this.handleError(error, 'Error al intentar crear el usuario');
      }
   }

   /**
    * Recupera todos los usuarios.
    *
    * @returns {Promise<ResponseUsuarioDto[]>} - Una promesa que se resuelve en el objeto de respuesta que contiene la lista de usuarios.
    */
   async findAll(): Promise<ResponseUsuarioDto[]> {
      try {
         const usuarios = await this.usuariosModel.find().exec();
         return plainToInstance(ResponseUsuarioDto, usuarios, {
            excludeExtraneousValues: true,
         });
      } catch (error) {
         this.handleError(
            error,
            'Error al intentar recuperar la lista de usuarios',
         );
      }
   }

   /**
    * Recupera un usuario por su email.
    *
    * @param {string} email - El email del usuario a recuperar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario encontrado.
    * @throws {NotFoundException} - Si no se encuentra el usuario con el email proporcionado.
    */
   async findOne(email: string): Promise<ResponseUsuarioDto> {
      try {
         const usuario = await this.usuariosModel.findOne({ email }).exec();
         if (!usuario) {
            throw new NotFoundException(
               `No se encontró ningún usuario con el email ${email}`,
            );
         }
         return plainToInstance(ResponseUsuarioDto, usuario, {
            excludeExtraneousValues: true,
         });
      } catch (error) {
         this.handleError(error, 'Error al intentar recuperar el usuario');
      }
   }

   /**
    * Actualiza un usuario por su email.
    *
    * @param {string} email - El email del usuario a actualizar.
    * @param {UpdateUsuarioDto} updateUsuarioDto - Objeto de transferencia de datos que contiene los detalles del usuario a actualizar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario actualizado.
    * @throws {NotFoundException} - Si no se encuentra el usuario con el email proporcionado.
    * @throws {InternalServerErrorException} - Si hay un error al intentar actualizar el usuario.
    */
   async update(
      email: string,
      updateUsuarioDto: UpdateUsuarioDto,
   ): Promise<ResponseUsuarioDto> {
      try {
         const usuario = await this.usuariosModel
            .findOneAndUpdate({ email }, updateUsuarioDto, { new: true })
            .exec();
         if (!usuario) {
            throw new NotFoundException(
               `No se encontró ningún usuario con el email ${email}`,
            );
         }
         return plainToInstance(ResponseUsuarioDto, usuario, {
            excludeExtraneousValues: true,
         });
      } catch (error) {
         this.handleError(error, 'Error al intentar actualizar el usuario');
      }
   }

   /**
    * Elimina un usuario por su email.
    *
    * @param {string} email - El email del usuario a eliminar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario eliminado.
    * @throws {NotFoundException} - Si no se encuentra el usuario con el email proporcionado.
    * @throws {InternalServerErrorException} - Si hay un error al intentar eliminar el usuario.
    */
   async remove(email: string): Promise<ResponseUsuarioDto> {
      // verificar si el usuario existe
      const usuarioBD = await this.findOne(email);
      try {
         if (usuarioBD) {
            const usuario = await this.usuariosModel
               .findOneAndDelete({ email })
               .exec();
            return plainToInstance(ResponseUsuarioDto, usuario, {
               excludeExtraneousValues: true,
            });
         } else {
            throw new NotFoundException(
               `No se encontró ningún usuario con email ${email}`,
            );
         }
      } catch (error) {
         this.handleError(error, 'Error al intentar eliminar el usuario');
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
         throw new ConflictException('¡El usuario ya existe!');
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
