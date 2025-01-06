import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';

/**
 * Módulo para gestionar las operaciones relacionadas con los usuarios.
 *
 * @module UsuariosModule
 */
@Module({
   // Registra el controlador UsuariosController
   controllers: [UsuariosController],
   // Registra el servicio UsuariosService
   providers: [UsuariosService],
   // Importa el esquema de Mongoose para Usuario
   imports: [
      MongooseModule.forFeature([
         { name: Usuario.name, schema: UsuarioSchema },
      ]),
   ],
   // Exporta el módulo de Mongoose para que esté disponible en otros módulos
   exports: [MongooseModule],
})
export class UsuariosModule {}
