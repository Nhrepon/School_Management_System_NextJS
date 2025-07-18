import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  // await prisma.$transaction([
  //   prisma.result.deleteMany(),
  //   prisma.exam.deleteMany(),
  //   prisma.assignment.deleteMany(),
  //   prisma.attendance.deleteMany(),
  //   prisma.lesson.deleteMany(),
  //   prisma.announcement.deleteMany(),
  //   prisma.event.deleteMany(),
  //   prisma.student.deleteMany(),
  //   prisma.parent.deleteMany(),
  //   prisma.teacher.deleteMany(),
  //   prisma.class.deleteMany(),
  //   prisma.grade.deleteMany(),
  //   prisma.subject.deleteMany(),
  //   prisma.admin.deleteMany(),
  // ]);

  // ADMIN
  await prisma.admin.create({
    data: {
      userName: "admin1",
      email: "admin1@nsms.com",
      password: "1234"
    },
  });
  await prisma.admin.create({
    data: {
      userName: "admin2",
      email: "admin2@nsms.com",
      password: "12345"
    },
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.create({
      data: {
        name: `${i} A class`, 
        gradeId: i, 
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // SUBJECT
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  for (const subject of subjectData) {
    await prisma.subject.create({ data: subject });
  }

  // TEACHER
  for (let i = 1; i <= 15; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`, // Unique ID for the teacher
        userName: `teacher${i}`,
        name: `TName${i}`,
        email: `teacher${i}@example.com`,
        mobile: `123-456-789${i}`,
        address: `Address${i}`,
        bloodGroup: "A+",
        sex: i % 2 === 0 ? UserSex.Male : UserSex.Female,
        subjects: { connect: [{ id: (i % 10) + 1 }] }, 
        classes: { connect: [{ id: (i % 6) + 1 }] }, 
        birthDay: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
      },
    });
  }

  // LESSON
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`, 
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ], 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)), 
        subjectId: (i % 10) + 1, 
        classId: (i % 6) + 1, 
        teacherId: `teacher${(i % 15) + 1}`, 
      },
    });
  }

  // PARENT
  for (let i = 1; i <= 25; i++) {
    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        userName: `parentId${i}`,
        name: `PName ${i}`,
        email: `parent${i}@example.com`,
        mobile: `123-456-789${i}`,
        address: `Address${i}`,
        image: `image${i}`,
        bloodGroup: `O+`,
        sex: i % 2 === 0 ? UserSex.Male : UserSex.Female,
      },
    });
  }

  // STUDENT
  for (let i = 1; i <= 50; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`, 
        userName: `student${i}`, 
        name: `SName${i}`,
        email: `student${i}@example.com`,
        mobile: `987-654-321${i}`,
        address: `Address${i}`,
        bloodGroup: "O-",
        sex: i % 2 === 0 ? UserSex.Male : UserSex.Female,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`, 
        gradeId: (i % 6) + 1, 
        classId: (i % 6) + 1, 
        birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      },
    });
  }

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`, 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`, 
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)), 
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90, 
        studentId: `student${i}`, 
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }), 
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(), 
        present: true, 
        studentId: `student${i}`, 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`, 
        description: `Description for Event ${i}`, 
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endDate: new Date(new Date().setHours(new Date().getHours() + 2)), 
        classId: (i % 5) + 1, 
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`, 
        description: `Description for Announcement ${i}`, 
        date: new Date(), 
        classId: (i % 5) + 1, 
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
