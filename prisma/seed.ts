import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create default settings if they don't exist
    const settings = await prisma.settings.findFirst()
    if (!settings) {
        await prisma.settings.create({
            data: {
                pointValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -20],
            },
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
