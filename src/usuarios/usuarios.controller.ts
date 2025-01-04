import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ResponseUsuarioDto } from './dto/response-usuario.dto';

/**
 * Controlador para gestionar las operaciones relacionadas con los usuarios.
 *
 * @class UsuariosController
 *
 */
@Controller('usuarios')
export class UsuariosController {
   constructor(private readonly usuariosService: UsuariosService) {}

   /**
    * Crea un nuevo usuario.
    *
    * @param {CreateUsuarioDto} createUsuarioDto - Objeto de transferencia de datos que contiene los detalles del usuario a crear.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario creado.
    */
   @Post()
   create(
      @Body() createUsuarioDto: CreateUsuarioDto
   ): Promise<ResponseUsuarioDto> {
      if (!createUsuarioDto.activo) {
         createUsuarioDto.activo = true;
      }
      return this.usuariosService.create(createUsuarioDto);
   }

   /**
    * Recupera todos los usuarios.
    *
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta que contiene la lista de usuarios.
    */
   @Get()
   findAll(): Promise<ResponseUsuarioDto[]> {
      return this.usuariosService.findAll();
   }

   /**
    * Recupera un usuario por su email.
    *
    * @param {string} email - El email del usuario a recuperar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario encontrado.
    */
   @Get(':email')
   findOne(@Param('email') email: string): Promise<ResponseUsuarioDto> {
      return this.usuariosService.findOne(email);
   }

   /**
    * Actualiza un usuario por su email.
    *
    * @param {string} email - El email del usuario a actualizar.
    * @param {UpdateUsuarioDto} updateUsuarioDto - Objeto de transferencia de datos que contiene los detalles del usuario a actualizar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario actualizado.
    */
   @Patch(':email')
   update(
      @Param('email') email: string,
      @Body() updateUsuarioDto: UpdateUsuarioDto
   ): Promise<ResponseUsuarioDto> {
      return this.usuariosService.update(email, updateUsuarioDto);
   }

   /**
    * Elimina un usuario por su email.
    *
    * @param {string} email - El email del usuario a eliminar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario eliminado.
    */
   @Delete(':email')
   remove(@Param('email') email: string): Promise<ResponseUsuarioDto> {
      return this.usuariosService.remove(email);
   }
}
