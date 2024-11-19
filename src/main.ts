import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activar las validaciones globales
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  // Leer el puerto y host desde las variables de entorno o usar valores por defecto
  const PORT = process.env.PORT || 3000; // Render proporciona el puerto en `process.env.PORT`
  const HOST = process.env.HOST || '0.0.0.0'; // Escuchar en todas las interfaces por defecto

  // Iniciar la aplicación
  await app.listen(PORT, HOST);

  console.log(`Application is running on: http://${HOST}:${PORT}`);
}
bootstrap();
