import { ValidationPipe, Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { updateDoc } from './common/swagger/swagger-utils';

const parseAppUrl = async (app: INestApplication) => {
  const url = await app.getUrl();
  return url.replace(/\[::1]|127.0.0.1/, 'localhost');
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = configService.get('PORT');
  const swaggerUpdate = configService.get('SWAGGER_UPDATE');
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
  const config = new DocumentBuilder()
    .setTitle('Pokedex')
    .setVersion('2.0')
    .addTag('pokemon')
    .addTag('seed')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    customCssUrl: '/css/custom.css',
  });
  await app.listen(port);
  logger.log(`App is running on: ${await parseAppUrl(app)}`);
  updateDoc(swaggerUpdate, port);
}
bootstrap();
