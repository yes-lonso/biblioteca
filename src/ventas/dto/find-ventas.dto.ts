import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';

import { TransformDate } from 'src/common/helpers/date-utils.helpers';

/**
 * Objeto de Transferencia de Datos (DTO) para encontrar ventas.
 * Esta clase se utiliza para definir la estructura de los datos necesarios para buscar registros de ventas.
 * 
 * @class FindVentasDto
 * 
 * @property {string} [idUsuario] - ID del usuario que realiza la compra.
 * @property {string} [idLibro] - ID del libro vendido.
 * @property {Date} [fechaInicio] - Fecha de inicio para la búsqueda de ventas.
 * @property {Date} [fechaFin] - Fecha de fin para la búsqueda de ventas.
 * 
 * @example
 * {
 *   idUsuario: "usuario19@viu.es",
 *   idLibro: "9763161484100",
 *   fechaInicio: "01-01-2025",
 *   fechaFin: "31-12-2025"
 * }
 */
export class FindVentasDto {
   /**
    * ID del usuario que realiza la compra.
    *
    * @example "usuario19@viu.es"
    */
   @ApiProperty({
      description: 'ID del usuario que realiza la compra',
      example: 'usuario19@viu.es',
      required: false,
   })
   @IsOptional()
   @IsString()
   readonly idUsuario?: string;

   /**
    * ID del libro vendido.
    *
    * @example "9763161484100"
    */
   @ApiProperty({
      description: 'ID del libro vendido',
      example: '9763161484100',
      required: false,
   })
   @IsOptional()
   @IsString()
   readonly idLibro?: string;

   /**
    * Fecha de inicio para la búsqueda de ventas.
    *
    * @example "01-01-2025"
    */
   @ApiProperty({
      description: 'Fecha de inicio para la búsqueda de ventas',
      example: '01-01-2025',
      required: false,
   })
   @IsOptional()
   @TransformDate({
      message: 'La fecha de inicio debe estar en el formato DD-MM-YYYY',
   })
   readonly fechaInicio?: Date;

   /**
    * Fecha de fin para la búsqueda de ventas.
    *
    * @example "31-12-2025"
    */
   @ApiProperty({
      description: 'Fecha de fin para la búsqueda de ventas',
      example: '31-12-2025',
      required: false,
   })
   @IsOptional()
   @TransformDate({
      message: 'La fecha de fin debe estar en el formato DD-MM-YYYY',
   })
   readonly fechaFin?: Date;
}
