import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const settings = await prisma.settings.findFirst();
  if (!settings) {
    await prisma.settings.create({
      data: {
        pointValues: [2, 5, 10, 15, 20, -2, -5, -10, -15, -20]
      }
    });
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
