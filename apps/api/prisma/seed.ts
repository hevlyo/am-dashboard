import { PrismaClient, Category, StudentStatus, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const prisma = new PrismaClient();

const statuses = Object.values(StudentStatus);

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function randomProgress(): number {
  return Math.floor(Math.random() * 101);
}

async function main() {
  console.log("Seeding database...");

  await prisma.enrollment.deleteMany();
  await prisma.student.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const configuredRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  const saltRounds =
    Number.isFinite(configuredRounds) && configuredRounds > 0
      ? configuredRounds
      : process.env.NODE_ENV === "production"
        ? 10
        : 8;
  const hashedPassword = await bcrypt.hash("123456", saltRounds);

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@amentoria.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  const testUser = await prisma.user.create({
    data: {
      name: "Usuário Teste",
      email: "teste@amentoria.com",
      password: hashedPassword,
      role: Role.USER,
    },
  });
  console.log(`Created test user: ${testUser.email}`);

  const coursesData = [
    {
      title: "Redação Nota 1000",
      category: Category.REDACAO,
      description: "Técnicas de redação para o ENEM",
      totalLessons: 12,
    },
    {
      title: "Interpretação de Texto",
      category: Category.LINGUAGENS,
      description: "Leitura e interpretação para provas",
      totalLessons: 18,
    },
    {
      title: "Literatura e Linguagens",
      category: Category.LINGUAGENS,
      description: "Gêneros textuais e literatura",
      totalLessons: 16,
    },
    {
      title: "Matemática Básica",
      category: Category.MATEMATICA,
      description: "Fundamentos de matemática para o ENEM",
      totalLessons: 20,
    },
    {
      title: "Matemática Avançada",
      category: Category.MATEMATICA,
      description: "Tópicos avançados de matemática",
      totalLessons: 25,
    },
    {
      title: "Biologia",
      category: Category.CIENCIAS_NATUREZA,
      description: "Biologia celular e genética",
      totalLessons: 24,
    },
    {
      title: "Física",
      category: Category.CIENCIAS_NATUREZA,
      description: "Mecânica, termodinâmica e óptica",
      totalLessons: 22,
    },
    {
      title: "Química",
      category: Category.CIENCIAS_NATUREZA,
      description: "Química orgânica e inorgânica",
      totalLessons: 20,
    },
    {
      title: "História do Brasil",
      category: Category.CIENCIAS_HUMANAS,
      description: "História brasileira completa",
      totalLessons: 22,
    },
    {
      title: "Geografia Física",
      category: Category.CIENCIAS_HUMANAS,
      description: "Climatologia, geomorfologia e hidrografia",
      totalLessons: 16,
    },
    {
      title: "Sociologia e Filosofia",
      category: Category.CIENCIAS_HUMANAS,
      description: "Fundamentos de ciências humanas",
      totalLessons: 14,
    },
  ];

  const courses = await Promise.all(
    coursesData.map((course) => prisma.course.create({ data: course })),
  );
  console.log(`Created ${courses.length} courses`);

  const firstNames = [
    "Ana",
    "Bruno",
    "Carla",
    "Diego",
    "Elena",
    "Felipe",
    "Gabriela",
    "Hugo",
    "Isabela",
    "João",
    "Karina",
    "Lucas",
    "Marina",
    "Nicolas",
    "Olivia",
    "Pedro",
    "Rafaela",
    "Samuel",
    "Tatiana",
    "Victor",
  ];
  const lastNames = [
    "Silva",
    "Santos",
    "Oliveira",
    "Souza",
    "Rodrigues",
    "Ferreira",
    "Almeida",
    "Pereira",
    "Lima",
    "Gomes",
    "Costa",
    "Ribeiro",
    "Martins",
    "Carvalho",
    "Araújo",
    "Melo",
    "Barbosa",
    "Rocha",
    "Dias",
    "Nascimento",
  ];

  const students = [];
  for (let i = 0; i < 100; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`;

    const student = await prisma.student.create({
      data: {
        name,
        email,
        status: randomElement(statuses),
        createdAt: randomDate(new Date("2024-01-01"), new Date()),
      },
    });
    students.push(student);
  }
  console.log(`Created ${students.length} students`);

  const enrollments = [];
  const startDate = new Date("2024-01-01");
  const endDate = new Date();

  for (const student of students) {
    const numEnrollments = Math.floor(Math.random() * 5) + 1;
    const selectedCourses = [...courses]
      .sort(() => 0.5 - Math.random())
      .slice(0, numEnrollments);

    for (const course of selectedCourses) {
      const progress = randomProgress();
      const enrolledAt = randomDate(startDate, endDate);
      const completedAt =
        progress === 100 ? randomDate(enrolledAt, endDate) : null;

      const enrollment = await prisma.enrollment.create({
        data: {
          studentId: student.id,
          courseId: course.id,
          progress,
          enrolledAt,
          completedAt,
        },
      });
      enrollments.push(enrollment);
    }
  }
  console.log(`Created ${enrollments.length} enrollments`);

  console.log("\nSeed completed!");
  console.log("\nTest credentials:");
  console.log("  Admin: admin@amentoria.com / 123456");
  console.log("  User:  teste@amentoria.com / 123456");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
