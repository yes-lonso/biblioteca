import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    if (!createUsuarioDto.activo) {
      createUsuarioDto.activo = true;
    }
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usuariosService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(email, updateUsuarioDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usuariosService.remove(email);
  }
}
