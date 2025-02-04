import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params?.id as string)
    const body = await readBody(event)

    if (!id || isNaN(id)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid trade list ID'
        })
    }

    try {
        // console.log('patch' + body.mode)
        const updatedList = await prisma.tradeList.update({
            where: { id },
            data: {
                mode: body.mode
            }
        })
        return {
            statusCode: 200,
            body: updatedList
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to update trade list',
            cause: error
        })
    }
})
