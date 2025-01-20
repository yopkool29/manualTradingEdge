import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const tradeId = parseInt(event.context.params?.id as string)
  const body = await readBody(event)

  return await prisma.trade.update({
    where: {
      id: tradeId
    },
    data: {
      comment: body.comment
    }
  })
})
