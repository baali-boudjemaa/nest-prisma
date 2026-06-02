import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { join } from 'path';
import { AppModule } from './app.module';
console.log(process.env.IS_NEXT);

function normalizeOrigin(origin: string) {
  return new URL(origin).origin;
}

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: normalizeOrigin(process.env.FRONTEND_URL ?? 'http://localhost:4444'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(cookieParser());
  app.useStaticAssets(
    join(process.cwd(), "uploads"),
    {
      prefix: "/uploads/",
    },
  );
  //app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
  await app.listen(process.env.PORT ?? 3002);
}
if (process.env.IS_NEXT === 'NO') {

}
bootstrap();
