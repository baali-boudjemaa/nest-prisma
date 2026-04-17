import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

const ENV = `.env.${process.env.NODE_ENV}`;
console.log(ENV);
@Module({
  imports: [ AuthModule, UserModule,
    ConfigModule.forRoot({
      // Dynamically picks .env.development or .env.production
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true, // Makes variables available across all modules
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
