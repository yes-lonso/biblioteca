import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FindPrestamoDto } from './dto/find-prestamo.dto';
import { find } from 'rxjs';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Post()
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamosService.create(createPrestamoDto);
  }

  @Get()
  findAll(@Body() findPrestamoDto: FindPrestamoDto) {
    return this.prestamosService.findAll(findPrestamoDto);
  }  

  @Patch()
  update(@Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamosService.update(updatePrestamoDto);
  }

  @Delete(':idUsuario/:idLibro')
  remove(@Param('idUsuario') idUsuario: string, @Param('idLibro') idLibro: string) {
    return this.prestamosService.remove(idUsuario, idLibro);
  }
}
