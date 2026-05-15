const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// الدالة الرئيسية اللي تشغل السيدنج
async function main() {
  console.log('Seeding database...');

  // امسح البيانات القديمة عشان نبدأ بقاعدة نظيفة
  // الترتيب مهم: الكورسات أول لأنها تعتمد على المستخدمين
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // ===== 1) إنشاء Admin =====
  // نشفّر الباسوورد قبل الحفظ (نفس اللي نسويه في Register)
  const adminPassword = await bcrypt.hash('admin1234', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@lms.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });
  console.log('Admin created:', admin.email);

  // ===== 2) إنشاء Trainee =====
  const traineePassword = await bcrypt.hash('trainee1234', 10);
  const trainee = await prisma.user.create({
    data: {
      name: 'Trainee User',
      email: 'trainee@lms.com',
      password: traineePassword,
      role: 'TRAINEE'
    }
  });
  console.log('Trainee created:', trainee.email);

  // ===== 3) إنشاء الكورسات =====
  // createMany = طريقة سريعة لإضافة عدة سجلات دفعة وحدة
  // createdById يربط الكورس بالـ Admin اللي أنشأه
  await prisma.course.createMany({
    data: [
      {
        title: 'Introduction to Node.js',
        description: 'Learn the fundamentals of Node.js, Express, and building REST APIs.',
        youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        createdById: admin.id
      },
      {
        title: 'React.js for Beginners',
        description: 'Master React.js from scratch with hooks, components, and state management.',
        youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        createdById: admin.id
      }
    ]
  });
  console.log('2 Courses created');

  console.log('Seeding completed!');
}

// تشغيل الدالة الرئيسية
main()
  // لو صار خطأ، اطبعه واخرج
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // في النهاية (سواء نجح أو فشل)، اقطع الاتصال بقاعدة البيانات
  .finally(async () => {
    await prisma.$disconnect();
  });