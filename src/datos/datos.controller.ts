import { Controller, Delete, Get } from '@nestjs/common';
import { TestDataService } from './datos.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controlador para manejar las solicitudes relacionadas con los datos de prueba.
 */
@ApiTags('Datos de prueba para usuarios y libros')
@Controller('datos')
export class TestDataController {
   /**
    * Construye una nueva instancia de TestDataController.
    * @param testDataService - El servicio utilizado para manejar las operaciones relacionadas con los datos de prueba.
    */
   constructor(private readonly testDataService: TestDataService) {}

   /**
    * Carga los datos de prueba.
    * @returns Un mensaje indicando el resultado de la carga de datos.
    */
   @Get()
   @ApiOperation({ summary: 'Cargar datos de prueba' })
   @ApiResponse({
      status: 200,
      description: 'Los datos de prueba han sido cargados exitosamente.',
   })
   loadData() {
      return this.testDataService.loadData();
   }
   /**
    * Elimina todos los datos de prueba.
    * @returns Un mensaje indicando el resultado de la eliminación de datos.
    */
   @Delete()
   @ApiOperation({ summary: 'Eliminar datos de prueba' })
   @ApiResponse({
      status: 200,
      description: 'Los datos de prueba han sido eliminados exitosamente.',
   })
   deleteData() {
      return this.testDataService.deleteData();
   }

}
