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
          pointValues: [1, 5, 10, -1, -5, -10],
          options: { winrateForNull: false }
        }
      })
    }

    const sortedPointValues = [...settings.pointValues].sort((a, b) => a - b)
    return {
      ...settings,
      pointValues: sortedPointValues,
      options: settings.options || { winrateForNull: false }
    }

  }

  // PUT /api/settings - Mettre à jour les paramètres
  if (method === 'PUT') {
    const body = await readBody(event)
    const settings = await prisma.settings.findFirst()

    if (settings) {
      return await prisma.settings.update({
        where: { id: settings.id },
        data: {
          pointValues: body.pointValues,
          options: body.options
        }
      })
    }

    return await prisma.settings.create({
      data: {
        pointValues: body.pointValues,
        options: { winrateForNull: false }
      }
    })
  }
})
