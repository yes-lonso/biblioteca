import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');

@Injectable()
export class DateUtilsService {
  formatToSpanish(date: Date, timeZone: string = 'Europe/Madrid'): string {
    return dayjs(date).tz(timeZone).format('dddd, D [de] MMMM [de] YYYY, h:mm:ss A');
  }
}