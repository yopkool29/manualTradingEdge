import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)

  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid trade ID'
    })
  }

  try {
    await prisma.trade.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting trade:', error)
    throw createError({
      statusCode: 500,
      message: 'Error deleting trade'
    })
  }
})
