const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  //   for (let i = 0; i < 100; i++) {
  //     const categoryName = faker.commerce.department();

  //     await prisma.category.upsert({
  //       where: { name: categoryName }, // Check if category exists
  //       update: {}, // Do nothing if it exists
  //       create: { name: categoryName }, // Otherwise, create it
  //     });
  //   }
  let departments = [] as string[];
  while (true) {
    if (departments.length >= 20) {
      break;
    }
    const department = faker.commerce.department();
    console.log(department);
    if (!departments.includes(department)) {
      departments.push(department);
    }
  }
  for (let i = 0; i < departments.length; i++) {
        
    await prisma.category.create({
      data: {
        name: departments[i],
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seeding completed!");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    prisma.$disconnect();
    process.exit(1);
  });
