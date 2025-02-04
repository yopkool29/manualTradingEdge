import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    console.log('Starting seeding...')
    const currentSettings = await prisma.settings.findFirst()
    console.log('Current settings:', currentSettings)
    if (!currentSettings) {
        console.log('No settings found, creating...')
        const updatedSettings = await prisma.settings.create({
            data: {
                options: { winrateForNull: true },
                pointValues: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10,
                    -11, -12, -13, -14, -15, -20,
                ],
            },
        })
        console.log('Created settings:', updatedSettings)
    } else {
        console.log('Settings found, updating...')
        const updatedSettings = await prisma.settings.update({
            where: { id: currentSettings.id },
            data: {
                options: { winrateForNull: true },
                pointValues: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10,
                    -11, -12, -13, -14, -15, -20,
                ],
            },
        })
        console.log('Updated settings:', updatedSettings)
    }
    console.log('Seeding finished')
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
