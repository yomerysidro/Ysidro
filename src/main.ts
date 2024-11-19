import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activar las validaciones globales
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  // Leer el puerto proporcionado por Railway o usar 3000 por defecto
  const PORT = process.env.PORT || 3000;

  // Escuchar en todas las interfaces disponibles
  await app.listen(PORT, '0.0.0.0');

  console.log(`Application is running on: http://0.0.0.0:${PORT}`);
}
bootstrap();
