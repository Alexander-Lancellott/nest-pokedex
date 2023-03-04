import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = configService.get('port');
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
  await app.listen(port, '0.0.0.0');
  logger.log(`App is running on: ${await app.getUrl()}`);
}
bootstrap();
