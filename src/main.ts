import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './shared/config/swagger.config';

const port = Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({transform: true}));  
  
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
