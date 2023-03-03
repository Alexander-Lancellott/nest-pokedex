import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //May cause lower performance than using @Type to transform types on DTOS
      /*transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },*/
    }),
  );
  await app.listen(3000);
}
bootstrap();
