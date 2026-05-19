import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. إنشاء الموظفين (Employees)

  const emp1 = await prisma.user.create({
    data: { name: 'أمل الحربي', email: 'amal@school.com', password: 'password123' },
  })
  const emp2 = await prisma.user.create({
    data: { name: 'سعد القحطاني', email: 'saad@school.com', password: 'password123' },
  })

  // 2. إنشاء المعلمين (Teachers)
  const teacher = await prisma.teacher.create({
    data: {
      firstName: 'سارة',
      lastName: 'الشمري',
      phoneNumber: '0501111111',
      email: 'sara.t@school.com',
      certifications: 'بكالوريوس رياض أطفال',
    },
  })

  // 3. إنشاء الفصول (Classrooms)
  const classA = await prisma.classroom.create({
    data: {
      name: 'فصل الفراشات',
      ageGroup: '3-4 سنوات',
      roomNumber: 'A1',
      maxCapacity: 15,
      leadTeacherId: teacher.id,
    },
  })

  // 4. إنشاء أولياء الأمور (Guardians)
  const guardian1 = await prisma.guardian.create({
    data: {
      firstName: 'أحمد',
      lastName: 'المالكي',
      phoneNumber: '0502222222',
      email: 'ahmed.m@example.com',
    },
  })
  const guardian2 = await prisma.guardian.create({
    data: {
      firstName: 'هند',
      lastName: 'الدوسري',
      phoneNumber: '0503333333',
      email: 'hind.d@example.com',
    },
  })

  // 5. إنشاء الطلاب (Students)
  const student1 = await prisma.student.create({
    data: {
      firstName: 'يوسف',
      lastName: 'المالكي',
      dateOfBirth: new Date('2022-05-15'),
      medicalInfo: 'لا توجد حساسيات',
      classId: classA.id,
    },
  })
  const student2 = await prisma.student.create({
    data: {
      firstName: 'مريم',
      lastName: 'الدوسري',
      dateOfBirth: new Date('2021-11-20'),
      medicalInfo: 'حساسية من الفول السوداني',
      classId: classA.id,
    },
  })

  // 6. الربط بين الطالب وولي الأمر وتحديد من الذي قام بالربط (StudentGuardian)
  await prisma.studentGuardian.create({
    data: {
      studentId: student1.id,
      guardianId: guardian1.id,
      relationship: 'أب',
      isEmergency: true,
      createdById: emp1.id, // تم الربط بواسطة الموظفة أمل
    },
  })

  await prisma.studentGuardian.create({
    data: {
      studentId: student2.id,
      guardianId: guardian2.id,
      relationship: 'أم',
      isEmergency: true,
      createdById: emp2.id, // تم الربط بواسطة الموظف سعد
    },
  })

  console.log('✅ تم إدخال البيانات التجريبية بنجاح!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
