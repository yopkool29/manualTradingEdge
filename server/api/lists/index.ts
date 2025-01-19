import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
  const method = event.method

  // GET /api/lists - Get all lists
  if (method === 'GET') {
    try {
      const lists = await prisma.tradeList.findMany({
        include: {
          trades: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return lists
    } catch (error) {
      console.error('Error fetching lists:', error)
      throw createError({
        statusCode: 500,
        message: 'Error fetching lists'
      })
    }
  }

  // POST /api/lists - Create a new list
  if (method === 'POST') {
    try {
      const body = await readBody(event)
      const list = await prisma.tradeList.create({
        data: {
          title: body.title,
          comment: body.comment
        },
        include: {
          trades: true
        }
      })
      return list
    } catch (error) {
      console.error('Error creating list:', error)
      throw createError({
        statusCode: 500,
        message: 'Error creating list'
      })
    }
  }
})
