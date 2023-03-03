import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const logger = new Logger('Bootstrap');
  const port = configService.get<number>('port');
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
  await app.listen(port);
  logger.log(`App is running on: http://localhost:${port}`);
}
bootstrap();
