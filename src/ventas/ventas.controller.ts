import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { find } from 'rxjs';
import { FindVentasDto } from './dto/find-ventas.dto';
import { ResponseVentaDto } from './dto/response-venta.dto';


@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  findAll(@Query() findVentasDto: FindVentasDto): Promise<ResponseVentaDto[]> {
    return this.ventasService.findAll(findVentasDto);
  }

  
}
