import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './classroom/class.module';
import { DailyLogModule } from './daily-log/daily-log.module';
import { TeacherModule } from './employee/teacher.module';
import { GuardianModule } from './guardian/guardian.module';
import { InscriptionModule } from './inscription/inscription.module';
import { OverviewController } from './overview/overview.controller';
import { OverviewModule } from './overview/overview.module';
import { OverviewService } from './overview/overview.service';
import { PaymentModule } from './payment/payment.module';
import { PrismaService } from './prisma/prisma.service';
import { StudentMilestoneModule } from './student-milestone/student-milestone.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
const ENV = `.env.${process.env.NODE_ENV}`;
console.log(ENV);
const ENV_FILE_PATH = process.env.ENV_FILE_PATH ?? ENV;
@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      // Dynamically picks .env.development or .env.production
      envFilePath: ENV_FILE_PATH,
      isGlobal: true, // Makes variables available across all modules
    }),
    OverviewModule,
    StudentModule,
    ClassModule,
    TeacherModule,
    PaymentModule,
    GuardianModule,
    InscriptionModule,
    AttendanceModule,
    DailyLogModule,
    StudentMilestoneModule,
  ],
  controllers: [AppController, OverviewController],
  providers: [AppService, PrismaService, OverviewService],
})
export class AppModule { }
