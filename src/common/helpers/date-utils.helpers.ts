import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';
import { Transform } from 'class-transformer';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');

/**
 * Transforma una cadena de fecha en el formato DD-MM-YYYY en un objeto Date.
 * Si la transformación falla, se lanza un error con un mensaje especificado o un mensaje predeterminado.
 *
 * @param options - Un objeto opcional que contiene un mensaje de error personalizado.
 * @param options.message - El mensaje de error personalizado que se utilizará si la transformación de la fecha falla.
 * @returns Una función que transforma el valor de entrada en un objeto Date si es una cadena de fecha válida.
 * @throws Lanzará un error si el valor de entrada es una cadena que no se puede transformar en un objeto Date válido.
 */
export function TransformDate(options?: { message: string }) {
   return Transform(({ value }) => {
      if (typeof value === 'string') {
         const [day, month, year] = value.split('-').map(Number);
         const date = new Date(year, month - 1, day);
         if (isNaN(date.getTime())) {
            throw new Error(
               options?.message ||
                  'La fecha debe estar en el formato DD-MM-YYYY'
            );
         }
         return date;
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
