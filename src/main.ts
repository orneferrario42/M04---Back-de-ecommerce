import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import { LoggerGlobal } from './middlewares/loggerMiddleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(LoggerGlobal);

const swaggerConfig = new DocumentBuilder()
      .setTitle('EcommerceOrnellaFerrario42')
      .setDescription('esta es una API construida con NEST para ser mepleada en este proyecto')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
const document = SwaggerModule.createDocument(app, swaggerConfig);
SwaggerModule.setup('api', app, document );

await app.listen(3000);
  console.log (`Servidor en escucha en puerto ${3000}`)
}
bootstrap();
