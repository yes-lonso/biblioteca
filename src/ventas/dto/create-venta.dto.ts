import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
   IsInt,
   IsNotEmpty,
   IsOptional,
   Max,
   Min,
} from 'class-validator';
import { TransformDate } from 'src/common/helpers/date-utils.helpers';

export class CreateVentaDto {
   /**
    * ID del libro vendido.
    *
    * @example "9783161484100"
    */
   @ApiProperty({
      description: 'ID del libro vendido',
      example: '9783161484100',
   })
   @IsNotEmpty({ message: "La propiedad 'idLibro' es requerida" })
   readonly idLibro: string;

   /**
    * ID del usuario que realiza la compra.
    *
    * @example "usuario19@viu.es"
    */
   @ApiProperty({
      description: 'ID del usuario que realiza la venta',
      example: 'usuario19@viu.es',
   })
      @IsNotEmpty({ message: "La propiedad 'idUsuario' es requerida" })
   readonly idUsuario: string;

   /**
    * Fecha de la venta.
    *
    * @example "20-01-2025"
    */

   @ApiProperty({ description: 'Fecha de la venta', example: '20-01-2025' })
   @IsOptional()
   @TransformDate({
      message:
         'La fecha de compra del libro debe estar en el formato DD-MM-YYYY',
      default: true,
   })
   readonly fechaVenta?: Date;

   /**
    * Descuento aplicable a la venta del libro.
    */
   @ApiProperty({
      description: 'El descuento aplicable a la venta del libro',
      example: 5,
   })
   @IsInt({ message: 'El valor de descuento debe ser un número entero' })
   @Min(0, { message: 'El valor de descuento no puede ser menor a 0' })
   @Max(100, { message: 'El valor de descuento no puede ser mayor a 100' })
   @IsOptional()
   @Transform(({ value }) => value ?? 0)
   descuento?: number = 0;
}
