import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)

  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid list ID'
    })
  }

  try {
    const list = await prisma.tradeList.findUnique({
      where: { id },
      include: {
        trades: true // Inclure les trades associés
      }
    })

    if (!list) {
      throw createError({
        statusCode: 404,
        message: 'List not found'
      })
    }

    return list
  } catch (error) {
    console.error('Error fetching list:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching list'
    })
  }
})
