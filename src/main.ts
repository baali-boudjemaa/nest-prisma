import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import cors from 'cors';
import 'dotenv/config';
import  cookieParser from 'cookie-parser';
console.log(process.env.IS_NEXT);
export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
  origin: 'http://localhost:3007',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  }));
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3002);
}
if(process.env.IS_NEXT==='NO'){
  bootstrap();
}
