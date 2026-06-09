import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let users: any[] = [];

    const fakePrisma = {
        user: {
            findUnique: async ({ where }: any) => users.find((u) => u.email === where.email) || null,
            create: async ({ data }: any) => {
                const u = { id: users.length + 1, ...data };
                users.push(u);
                return u;
            },
            findMany: async () => users,
        },
    };

    const fakeJwt = {
        signAsync: async () => 'e2e-token',
    };

    beforeEach(async () => {
        users = [];
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider('PrismaService')
            .useValue(fakePrisma)
            .overrideProvider('JwtService')
            .useValue(fakeJwt)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('signup then signin flow', async () => {
        const body = { email: 'x@x.com', password: 'pass', role: 'USER', name: 'X' };
        // Signup
        await request(app.getHttpServer())
            .post('/auth/signup')
            .send(body)
            .expect((res) => {
                if (!res.body.token) throw new Error('no token returned');
            });

        // Signin
        await request(app.getHttpServer())
            .post('/auth/signin')
            .send({ email: body.email, password: body.password })
            .expect((res) => {
                if (!res.body.token) throw new Error('no token returned on signin');
            });
    });
});
