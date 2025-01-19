import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const method = event.method

  // GET /api/settings - Récupérer les paramètres
  if (method === 'GET') {
    const settings = await prisma.settings.findFirst()
    if (!settings) {
      // Créer les paramètres par défaut si ils n'existent pas
      return await prisma.settings.create({
        data: {
          pointValues: [1, 5, 10, -1, -5, -10]
        }
      })
    }
    return settings
  }

  // PUT /api/settings - Mettre à jour les paramètres
  if (method === 'PUT') {
    const body = await readBody(event)
    const settings = await prisma.settings.findFirst()

    if (settings) {
      return await prisma.settings.update({
        where: { id: settings.id },
        data: {
          pointValues: body.pointValues
        }
      })
    }

    return await prisma.settings.create({
      data: {
        pointValues: body.pointValues
      }
    })
  }
})
