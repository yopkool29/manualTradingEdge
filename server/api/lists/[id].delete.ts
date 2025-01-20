import prisma from '~/server/db/client'

export default defineEventHandler(async (event) => {
    const id = Number(event.context.params?.id)
    const query = getQuery(event)
    const deleteType = query.deleteType as string

    // console.log(deleteType)

    if (!id || isNaN(id)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid list ID',
        })
    }

    try {
        // Delete all trades associated with the list
        await prisma.trade.deleteMany({
            where: {
                listId: id,
            },
        })

        // Only delete the list itself if deleteType is not 'trades-only'
        if (deleteType !== 'trades-only') {
            await prisma.tradeList.delete({
                where: {
                    id: id,
                },
            })
        }

        return { success: true }
    } catch (error) {
        console.error('Error deleting list:', error)
        throw createError({
            statusCode: 500,
            message: 'Error deleting list',
        })
    }
})
