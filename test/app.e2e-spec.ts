//import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NestFactory } from '@nestjs/core';
import { JSDOM } from 'jsdom';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    /*const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();*/
    //app = moduleFixture.createNestApplication();

    app = await NestFactory.create(AppModule);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        const doc = new JSDOM(res.text);
        const textElement = doc.window.document.getElementById('title');
        if (!textElement) {
          throw new Error('Title id not found');
        } else if (textElement.textContent !== 'Pokedex API')
          throw new Error('Unexpected title');
      });
  });
});
