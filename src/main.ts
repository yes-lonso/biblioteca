import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Función principal para inicializar la aplicación NestJS.
 *
 * @async
 * @function bootstrap
 * @returns {Promise<void>} - Una promesa que se resuelve cuando la aplicación está lista para aceptar conexiones.
 */
async function bootstrap() {
   // Crea una instancia de la aplicación NestJS utilizando el módulo principal AppModule
   const app = await NestFactory.create(AppModule);

   // Establece un prefijo global para todas las rutas de la API
   // Esto significa que todas las rutas de la API comenzarán con '/api'
   app.setGlobalPrefix('api');

   // Configura pipes globales para la validación y transformación de datos
   app.useGlobalPipes(
      new ValidationPipe({
         // Elimina propiedades no definidas en los DTOs
         whitelist: true,
         // Lanza una excepción si se encuentran propiedades no definidas en los DTOs
         forbidNonWhitelisted: true,
      }),
   );

   // Habilitar CORS
   app.enableCors();
   // Inicia la aplicación y escucha en el puerto especificado en la variable de entorno PORT
   // Si PORT no está definido, utiliza el puerto 3000 por defecto
   const port = process.env.PORT ?? 3000;
   await app.listen(port);

   // Mostrar en consola que la aplicación está lista y corriendo en el puerto especificado
   console.log(`La aplicación está corriendo en el puerto ${port}`);
}

// Llama a la función bootstrap para iniciar la aplicación
bootstrap();
