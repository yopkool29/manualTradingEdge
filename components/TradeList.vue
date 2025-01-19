<template>
    <div class="bg-white shadow rounded-lg p-6">
        <div class="mb-4">
            <h2 class="text-xl font-semibold">{{ list.title }}</h2>
            <p class="text-gray-600">{{ list.comment }}</p>
        </div>


        <div class="mt-4 max-w-lg">
            <div class="grid grid-cols-[auto_1fr_1fr] gap-4 mb-2 font-medium text-gray-600 px-3">
                <div class="flex items-center justify-between">N°</div>
                <div>Points</div>
                <div>Cumul</div>
            </div>
            <div class="space-y-2">
                <div v-for="(trade, index) in list.trades" :key="trade.id" class="grid grid-cols-[auto_1fr_1fr] gap-4 items-center p-3 bg-gray-50 rounded group">
                    <div class="text-gray-600 flex items-center justify-between gap-4">
                        <button @click="deleteTrade(trade.id)" class="text-red-700">
                            ×
                        </button>
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
                </div>
                <div v-if="list.trades.length === 0" class="text-gray-500 text-center py-2">
                    No trades in history
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-6 mt-6">
            <button v-for="value in pointValues" :key="value" @click="addTrade(value)" class="px-4 py-2 rounded-md" :class="value > 0 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'">
                {{ value > 0 ? '+' : '' }}{{ value }}
            </button>
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
}>()

const addTrade = (points: number) => {
    emit('addTrade', props.list.id, points)
}

const deleteTrade = (tradeId: number) => {
    emit('deleteTrade', tradeId)
}

const getCumulativeSum = (currentIndex: number): number => {
    if (!props.list?.trades) return 0
    return props.list.trades
        .slice(0, currentIndex + 1)
        .reduce((sum, trade) => sum + trade.points, 0)
}
</script>
