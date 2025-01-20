import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const listId = parseInt(event.context.params?.id as string)
  const body = await readBody(event)

  return await prisma.trade.create({
    data: {
      points: body.points,
      comment: body.comment || "",
      listId: listId
    }
  })
})
