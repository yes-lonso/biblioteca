import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { FindVentasDto } from './dto/find-ventas.dto';
import { ResponseVentaDto } from './dto/response-venta.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('ventas')
@ApiTags('Gestión de ventas de libros')
export class VentasController {
   constructor(private readonly ventasService: VentasService) {}

   @Post()
   @ApiOperation({ summary: 'Crear una nueva venta' })
   create(@Body() createVentaDto: CreateVentaDto) {
      return this.ventasService.create(createVentaDto);
   }

   @Get()
   @ApiOperation({
      summary: 'Recuperar todas las ventas según criterios proporcionados',
   })
   findAll(@Query() findVentasDto: FindVentasDto): Promise<ResponseVentaDto[]> {
      return this.ventasService.findAll(findVentasDto);
   }
}
