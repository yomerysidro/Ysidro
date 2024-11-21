import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Logger para depuración
  const logger = new Logger('Bootstrap');

  // Configurar CORS de manera explícita
  app.enableCors({
    origin: '*', // Permite todas las fuentes (puedes restringir en producción)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configurar puerto y host desde variables de entorno o valores por defecto
  const PORT = process.env.PORT || 49599;
  const HOST = process.env.HOST || '0.0.0.0';

  await app.listen(PORT, HOST);

 // logger.log(Aplicación ejecutándose en: http://${HOST}:${PORT} );
}
bootstrap();