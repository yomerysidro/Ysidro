import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validaciones globales
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  // Leer el puerto de las variables de entorno o usar un valor predeterminado
  const PORT = process.env.PORT || 3000;

  // Escuchar en cualquier interfaz (importante para Render)
  await app.listen(PORT, '0.0.0.0');

  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
