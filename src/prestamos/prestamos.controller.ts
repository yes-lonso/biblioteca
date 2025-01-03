import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FindPrestamoDto } from './dto/find-prestamo.dto';


/**
 * Controlador para manejar las solicitudes relacionadas con los préstamos.
 */
@Controller('prestamos')
export class PrestamosController {
  /**
   * Construye una nueva instancia de PrestamosController.
   * @param prestamosService - El servicio utilizado para manejar las operaciones CRUD de prestamos.
   */
  constructor(private readonly prestamosService: PrestamosService) { }

  /**
   * Crea un nuevo prestamo.
   * @param createPrestamoDto - El DTO (objeto de transferencia de datos) que contiene los datos para crear un nuevo prestamo.
   * @returns El prestamo creado.
   */
  @Post()
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamosService.create(createPrestamoDto);
  }

  /**
   * Recupera todos los prestamos.
   * @param findPrestamoDto - El DTO (objeto de transferencia de datos) que contiene los criterios para encontrar prestamos.
   * @returns Una lista de prestamos.
   */
  @Get()
  findAll(@Body() findPrestamoDto: FindPrestamoDto) {
    return this.prestamosService.findAll(findPrestamoDto);
  }

  /**
   * Actualiza un prestamo existente.
   * @param updatePrestamoDto - El DTO (objeto de transferencia de datos) que contiene los datos para actualizar el prestamo.
   * @returns El prestamo actualizado.
   */
  @Patch()
  update(@Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamosService.update(updatePrestamoDto);
  }

  /**
   * Elimina un prestamo.
   * @param idUsuario - El ID del usuario asociado con el prestamo.
   * @param idLibro - El ID del libro asociado con el prestamo.
   * @returns El resultado de la operación de eliminación.
   */
  @Delete(':idUsuario/:idLibro')
  remove(@Param('idUsuario') idUsuario: string, @Param('idLibro') idLibro: string) {
    return this.prestamosService.remove(idUsuario, idLibro);
  }
}
