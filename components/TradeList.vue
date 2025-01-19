<template>
    <div class="bg-white shadow rounded-lg p-6">
        <div class="mb-4">
            <h2 class="text-xl font-semibold">{{ list.title }}</h2>
            <p class="text-gray-600">{{ list.comment }}</p>
        </div>


        <div class="mt-4 max-w-lg">
            <div class="grid grid-cols-[auto_1fr_1fr_2fr] gap-4 mb-2 font-medium text-gray-600 px-3">
                <div class="flex items-center justify-between">N°</div>
                <div>Points</div>
                <div>Cumul</div>
                <div>Commentaire</div>
            </div>
            <div class="space-y-2">
                <div v-for="(trade, index) in list.trades" :key="trade.id" class="grid grid-cols-[auto_1fr_1fr_2fr] gap-4 items-center p-3 bg-gray-50 rounded group">
                    <div class="text-gray-600 flex items-center justify-between gap-4">
                        <UButton
                            @click="deleteTrade(trade.id)"
                            color="red"
                            variant="ghost"
                            icon="i-heroicons-x-mark"
                        />
                        <span>#{{ index + 1 }}</span>
                    </div>
                    <div :class="trade.points >= 0 ? 'text-green-600' : 'text-red-600'">
                        {{ trade.points > 0 ? '+' : '' }}{{ trade.points }}
                    </div>
                    <div>
                        <span :class="getCumulativeSum(index) >= 0 ? 'text-green-600' : 'text-red-600'">
                            {{ getCumulativeSum(index) > 0 ? '+' : '' }}{{ getCumulativeSum(index) }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UInput
                            v-model="trade.comment"
                            @change="updateTradeComment(trade.id, trade.comment)"
                            placeholder="Ajouter un commentaire..."
                            size="sm"
                        />
                    </div>
                </div>
                <div v-if="list.trades.length === 0" class="text-gray-500 text-center py-2">
                    Aucun historique
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-6 mt-6">
            <UButton
                v-for="value in pointValues"
                :key="value"
                @click="addTrade(value)"
                :color="value > 0 ? 'green' : 'red'"
                variant="solid"
            >
                {{ value > 0 ? '+' : '' }}{{ value }}
            </UButton>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { TradeList } from '~/types'

const props = defineProps<{
    list: TradeList
    pointValues: number[]
}>()

const emit = defineEmits<{
    (e: 'addTrade', listId: number, points: number): void
    (e: 'deleteTrade', tradeId: number): void
    (e: 'updateComment', tradeId: number, comment: string): void
}>()

const addTrade = (points: number) => {
    emit('addTrade', props.list.id, points)
}

const deleteTrade = (tradeId: number) => {
    emit('deleteTrade', tradeId)
}

const updateTradeComment = (tradeId: number, comment: string) => {
    emit('updateComment', tradeId, comment)
}

const getCumulativeSum = (currentIndex: number): number => {
    if (!props.list?.trades) return 0
    return props.list.trades
        .slice(0, currentIndex + 1)
        .reduce((sum, trade) => sum + trade.points, 0)
}
</script>
