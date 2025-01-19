import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const listId = parseInt(event.context.params.id)
  const body = await readBody(event)

  return await prisma.trade.create({
    data: {
      points: body.points,
      listId: listId
    }
  })
})
