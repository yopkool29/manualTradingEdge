import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const body = await readBody(event)

  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid list ID'
    })
  }

  try {
    const updatedList = await prisma.tradeList.update({
      where: { id },
      data: {
        title: body.title,
        comment: body.comment
      },
      include: {
        trades: true
      }
    })

    return updatedList
  } catch (error) {
    console.error('Error updating list:', error)
    throw createError({
      statusCode: 500,
      message: 'Error updating list'
    })
  }
})
