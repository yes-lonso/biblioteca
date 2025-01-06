import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   Query,
} from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FindPrestamoDto } from './dto/find-prestamo.dto';
import { ResponsePrestamoDto } from './dto/response-prestamo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controlador para manejar las solicitudes relacionadas con los préstamos.
 */
@ApiTags('Gestión de prestamos de libros a usuarios')
@Controller('prestamos')
export class PrestamosController {
   /**
    * Construye una nueva instancia de PrestamosController.
    * @param prestamosService - El servicio utilizado para manejar las operaciones CRUD de prestamos.
    */
   constructor(private readonly prestamosService: PrestamosService) {}

   /**
    * Crea un nuevo prestamo.
    * @param createPrestamoDto - El DTO (objeto de transferencia de datos) que contiene los datos para crear un nuevo prestamo.
    * @returns El prestamo creado.
    */
   @Post()
   @ApiOperation({ summary: 'Crear un nuevo préstamo' })
   @ApiResponse({
      status: 201,
      description: 'El préstamo ha sido creado.',
      type: ResponsePrestamoDto,
   })
   @ApiResponse({
      status: 400,
      description: 'Datos proporcionados no válidos.',
   })
   @ApiResponse({
      status: 409,
      description: 'El libro ya está prestado, o el usuario no está activo.',
   })
   create(
      @Body() createPrestamoDto: CreatePrestamoDto,
   ): Promise<ResponsePrestamoDto> {
      return this.prestamosService.create(createPrestamoDto);
   }

   /**
    * Recupera todos los prestamos.
    * @param findPrestamoDto - El DTO (objeto de transferencia de datos) que contiene los criterios para encontrar prestamos.
    * @returns Una lista de prestamos.
    */
   @Get()
   @ApiOperation({
      summary: 'Obtener todos los préstamos según los criterios de búsqueda',
      description:
         'Obtiene todos los préstamos que coinciden con los criterios de búsqueda proporcionados. Puede utilizar el email del usuario, el ISBN del libro y el estado del préstamo, que puede ser "todos", "prestados" o "devueltos".',
   })
   @ApiResponse({
      status: 200,
      description: 'Lista de préstamos encontrados.',
      type: [ResponsePrestamoDto],
   })
   findAll(@Query() findPrestamoDto: FindPrestamoDto) {
      return this.prestamosService.findAll(findPrestamoDto);
   }

   /**
    * Realiza la devolución de un préstamo.
    * @param updatePrestamoDto - El DTO (objeto de transferencia de datos) que contiene los datos para actualizar el prestamo.
    * @returns El prestamo que ha sido devuelto.
    */
   @Patch()
   @ApiOperation({ summary: 'Devolución de un préstamo',description: 'Realiza la devolución de un préstamo con el email del usuario, el isbn del libro y la fecha de devolución real del libro.' })
   @ApiResponse({
      status: 200,
      description: 'El préstamo ha sido devuelto.',
      type: ResponsePrestamoDto,
   })
   @ApiResponse({ status: 404, description: 'Préstamo no encontrado.' })
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
   @ApiOperation({ summary: 'Eliminar un préstamo' })
   @ApiResponse({ status: 200, description: 'El préstamo ha sido eliminado.' })
   @ApiResponse({ status: 404, description: 'Datos del préstamo no econtrados.' })
   remove(
      @Param('idUsuario') idUsuario: string,
      @Param('idLibro') idLibro: string,
   ) {
      return this.prestamosService.remove(idUsuario, idLibro);
   }
}
