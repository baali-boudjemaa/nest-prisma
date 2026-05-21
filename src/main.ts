import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { AppModule } from './app.module';
console.log(process.env.IS_NEXT);

function normalizeOrigin(origin: string) {
  return new URL(origin).origin;
}

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: normalizeOrigin(process.env.FRONTEND_URL ?? 'http://localhost:4444'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(cookieParser());
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
