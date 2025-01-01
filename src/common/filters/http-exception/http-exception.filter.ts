import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { DateUtilsService } from '../../helpers/date-utils.helpers';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly dateUtilsService: DateUtilsService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    // Asegurarse de que exceptionResponse.message sea un array
    const messages = Array.isArray(exceptionResponse.message) ? exceptionResponse.message : [exceptionResponse.message];

    const translatedErrors = messages.map((msg: string) => {
      // Intentar extraer el nombre de la propiedad del mensaje
      const propertyMatch = msg.match(/property (\w+)/) || msg.match(/(\w+) must/);
      const property = propertyMatch ? propertyMatch[1] : 'desconocida';

      if (msg.includes('should not exist')) {
        return `La propiedad '${property}' no debería existir`;
      }
      if (msg.includes('is not allowed')) {
        return `La propiedad '${property}' no está permitida`;
      }
      if (msg.includes('must be a string')) {
        return `La propiedad '${property}' debe ser una cadena de texto`;
      }
      if (msg.includes('is required') || msg.includes('should not be empty')) {
        return `La propiedad '${property}' es requerida`;
      }
      if (msg.includes('must be a date')) {
        return `La propiedad '${property}' debe ser una fecha`;
      }
      if (msg.includes('must be an integer number')) {
        return `La propiedad '${property}' debe ser un número entero`;
      }
      if (msg.includes('must be a positive number')) {
        return `La propiedad '${property}' debe ser un número positivo`;
      }
      if (msg.includes('must be longer than or equal to')) {
        const minLengthMatch = msg.match(/(\d+) characters/);
        const minLength = minLengthMatch ? minLengthMatch[1] : 'desconocida';
        if (minLength === '1') {
          return `La propiedad '${property}' no puede estar vacía`;
        }
        return `La propiedad '${property}' debe tener al menos ${minLength} caracteres`;
      }
      if (msg.includes('must be shorter than or equal to')) {
        const maxLengthMatch = msg.match(/(\d+) characters/);
        const maxLength = maxLengthMatch ? maxLengthMatch[1] : 'desconocida';
        return `La propiedad '${property}' debe tener como máximo ${maxLength} caracteres`;
      }

      // Puedes agregar más traducciones aquí
      return msg;
    });

    const formattedDate = this.dateUtilsService.formatToSpanish(new Date());

    response.status(status).json({
      statusCode: status,
      timestamp: formattedDate,
      path: request.url,
      message: translatedErrors,
    });
  }
}