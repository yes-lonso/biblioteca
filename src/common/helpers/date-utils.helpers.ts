import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.locale('es');

/**
 * Transforma una cadena de fecha en el formato DD-MM-YYYY en un objeto Date.
 * Si la transformación falla, se lanza un error con un mensaje especificado o un mensaje predeterminado.
 *
 * @param options - Un objeto opcional que contiene un mensaje de error personalizado.
 * @param options.message - El mensaje de error personalizado que se utilizará si la transformación de la fecha falla.
 * @param options.default - Un valor booleano que indica si se debe devolver la fecha actual sin hora si el valor de entrada es nulo o indefinido.
 * @returns Una función que transforma el valor de entrada en un objeto Date si es una cadena de fecha válida.
 * @throws Lanzará un error si el valor de entrada es una cadena que no se puede transformar en un objeto Date válido.
 */
export function TransformDate(options?: { message: string, default?: boolean }) {
   return Transform(({ value }) => {
      if (typeof value === 'string') {
         const date = dayjs(value, "DD-MM-YYYY");
         if (!date.isValid()) {
            throw new BadRequestException(
               options?.message || 'La fecha debe estar en el formato DD-MM-YYYY',
            );
         }
         // Eliminar la hora de la fecha
         return date.startOf('day').toDate();
      }
      if (options?.default && (value === undefined || value === null)) {
         return dayjs().startOf('day').toDate(); // Fecha actual sin hora por defecto
      }
      return value;      
   });
}

/**
 * Formatea una fecha dada a una cadena en español.
 *
 * @param date - La fecha a formatear.
 * @param timeZone - La zona horaria a utilizar para el formato. Por defecto es 'Europe/Madrid'.
 * @returns Una cadena que representa la fecha formateada en español.
 */
export function formatToSpanish(
   date: Date,
   timeZone: string = 'Europe/Madrid',
   format = 'DD-MM-YYYY'
): string {
   const fecha = dayjs(date).tz(timeZone).format(format);   
   return fecha;
}
