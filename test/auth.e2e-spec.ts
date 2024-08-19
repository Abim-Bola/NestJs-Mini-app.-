import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication system', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Handles a signup request', () => {
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: 'ag@gmail.com', password: 'a' })
            .expect(201)
            .then((res) => {
                const { id, email } = res.body
                expect(id).toBeDefined()
            })
    });

    it('Signup as new user and get current logged in user', async () => {
        const email = 'ag@gmail.com'
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: 'ag@gmail.com', password: 'a' })
            .expect(201)

        const cookie = res.get('Set-Cookie') //Gets the cookie so we can attach to other requests
        const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200)

        expect(body.email).toEqual(email)
    });
});
