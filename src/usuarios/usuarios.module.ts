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
   controllers: [UsuariosController],
   providers: [UsuariosService],
   imports: [
      MongooseModule.forFeature([
         { name: Usuario.name, schema: UsuarioSchema },
      ]),
   ],
   exports: [MongooseModule],
})
export class UsuariosModule {}
