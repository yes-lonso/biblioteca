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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controlador para manejar las solicitudes relacionadas con los usuarios.
 * @class UsuariosController
 */
@ApiTags('usuarios')
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
   @ApiOperation({ summary: 'Crear un nuevo usuario' })
   @ApiResponse({
      status: 201,
      description: 'El usuario ha sido creado.',
      type: ResponseUsuarioDto,
   })
   @ApiResponse({
      status: 400,
      description: 'Datos proporcionados no válidos.',
   })
   create(
      @Body() createUsuarioDto: CreateUsuarioDto,
   ): Promise<ResponseUsuarioDto> {
      if (!createUsuarioDto.activo) {
         createUsuarioDto.activo = true;
      }
      return this.usuariosService.create(createUsuarioDto);
   }

   /**
    * Recupera todos los usuarios.
    *
    * @returns {Promise<ResponseUsuarioDto[]>} - Una promesa que se resuelve en una lista de objetos de respuesta de usuarios.
    */
   @Get()
   @ApiOperation({ summary: 'Obtener todos los usuarios' })
   @ApiResponse({
      status: 200,
      description: 'Lista de usuarios.',
      type: [ResponseUsuarioDto],
   })
   findAll(): Promise<ResponseUsuarioDto[]> {
      return this.usuariosService.findAll();
   }

   /**
    * Recupera un usuario por su email.
    *
    * @param {string} email - El ID (email) del usuario a recuperar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario recuperado.
    */
   @Get(':email')
   @ApiOperation({ summary: 'Obtener un usuario por email' })
   @ApiResponse({
      status: 200,
      description: 'Detalles del usuario.',
      type: ResponseUsuarioDto,
   })
   @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado.',
   })
   findOne(@Param('email') email: string): Promise<ResponseUsuarioDto> {
      return this.usuariosService.findOne(email);
   }

   /**
    * Actualiza un usuario por su ID (email).
    *
    * @param {string} email - El ID (email) del usuario a actualizar.
    * @param {UpdateUsuarioDto} updateUsuarioDto - Objeto de transferencia de datos que contiene los detalles del usuario a actualizar.
    * @returns {Promise<ResponseUsuarioDto>} - Una promesa que se resuelve en el objeto de respuesta del usuario actualizado.
    */
   @Patch(':email')
   @ApiOperation({ summary: 'Actualizar un usuario por Email' })
   @ApiResponse({
      status: 200,
      description: 'El usuario ha sido actualizado.',
      type: ResponseUsuarioDto,
   })
   @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado.',
   })
   update(
      @Param('email') email: string,
      @Body() updateUsuarioDto: UpdateUsuarioDto,
   ): Promise<ResponseUsuarioDto> {
      return this.usuariosService.update(email, updateUsuarioDto);
   }

   /**
    * Elimina un usuario por su ID.
    *
    * @param {string} id - El ID del usuario a eliminar.
    * @returns {Promise<void>} - Una promesa que se resuelve cuando el usuario ha sido eliminado.
    */
   @Delete(':email')
   @ApiOperation({ summary: 'Eliminar un usuario por Email' })
   @ApiResponse({
      status: 200,
      description: 'El usuario ha sido eliminado.',
   })
   @ApiResponse({
      status: 404,
      description: 'Usuario no encontrado.',
   })
   remove(@Param('email') email: string): Promise<ResponseUsuarioDto> {
      return this.usuariosService.remove(email);
   }
}
