import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AiModule } from '@app/ai/ai.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/chat (POST)', () => {
    return request(app.getHttpServer())
      .post('/chat')
      .expect(200)
      .expect('Running...');
  });
});
