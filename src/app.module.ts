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
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { GuardiansModule } from './guardians/guardians.module';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { SchoolYearsModule } from './school-years/school-years.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { AbsencesModule } from './absences/absences.module';
import { DailyLogsModule } from './daily-logs/daily-logs.module';
import { MilestonesModule } from './milestones/milestones.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { CourseAttendanceModule } from './course-attendance/course-attendance.module';
import { ExamsModule } from './exams/exams.module';
import { GradesModule } from './grades/grades.module';
import { PaymentsModule } from './payments/payments.module';
import { ExpensesModule } from './expenses/expenses.module';
import { InventoryModule } from './inventory/inventory.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';
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
    UsersModule,
    EmployeesModule,
    GuardiansModule,
    StudentsModule,
    ClassroomsModule,
    SchoolYearsModule,
    InscriptionsModule,
    AbsencesModule,
    DailyLogsModule,
    MilestonesModule,
    CoursesModule,
    EnrollmentsModule,
    CourseAttendanceModule,
    ExamsModule,
    GradesModule,
    PaymentsModule,
    ExpensesModule,
    InventoryModule,
    DashboardModule,
    PrismaModule,
  ],
  controllers: [AppController, OverviewController],
  providers: [AppService, PrismaService, OverviewService],
})
export class AppModule { }
