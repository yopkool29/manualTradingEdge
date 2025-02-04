<template>
    <div class="bg-white shadow rounded-lg p-6">
        <div class="mb-4">
            <h2 class="text-xl font-semibold">{{ list.title }}</h2>
            <p class="text-gray-600 whitespace-pre-wrap">{{ list.comment }}</p>
        </div>

        <div class="flex items-center gap-4 mb-4">
            <div class="bg-gray-50 rounded p-3">
                <span class="font-medium">Win Rate: </span>
                <span :class="getValueClass(getWinRateValue())">
                    {{ formatValue(getWinRateValue()) }}
                </span>
            </div>
            <div class="bg-gray-50 rounded p-3">
                <span class="font-medium">Mode: </span>
                <select v-model="selectedMode" class="ml-2 p-1 rounded border">
                    <option value="normal">Normal</option>
                    <option value="mode1">TP fixe + TSL</option>
                </select>
            </div>
            <UButton v-if="list.trades.length > 0" @click="clearTrades" color="red" variant="soft" icon="i-heroicons-trash">
                {{ $t('trades.clearAll') }}
            </UButton>
        </div>

        <div class="flex flex-wrap gap-2 mb-6 mt-6">
            <UButton v-for="value in pointValues" :key="value" @click="addTrade(value)" :color="value > 0 ? 'green' : 'red'" variant="solid">
                {{ formatValue(value) }}
            </UButton>
        </div>
        <div class="mt-4 max-w-6xl">
            <div class="grid gap-4 mb-2 font-medium text-gray-600 px-3" :class="{
                'grid-cols-[120px_100px_120px_120px_120px_1fr]': selectedMode === 'mode1',
                'grid-cols-[120px_100px_120px_1fr]': selectedMode !== 'mode1'
            }">
                <div>{{ $t('trades.number') }}</div>
                <div>{{ $t('trades.points') }}</div>
                <div>{{ $t('trades.cumulative') }}</div>
                <div v-if="selectedMode === 'mode1'">Gain</div>
                <div v-if="selectedMode === 'mode1'">Cumul Gain</div>
                <div>{{ $t('trades.comment') }}</div>
            </div>
            <div class="space-y-2">
                <div v-for="(trade, index) in [...list.trades].reverse()" :key="trade.id" class="grid gap-4 items-center p-3 bg-gray-50 rounded group" :class="{
                    'grid-cols-[120px_100px_120px_120px_120px_1fr]': selectedMode === 'mode1',
                    'grid-cols-[120px_100px_120px_1fr]': selectedMode !== 'mode1'
                }">
                    <div class="text-gray-600 flex items-center justify-around gap-4">
                        <span>#{{ list.trades.length - index }}</span>
                        <UButton @click="deleteTrade(trade.id)" color="red" variant="ghost" icon="i-heroicons-x-mark" />
                    </div>
                    <div :class="getValueClass(trade.points)">
                        {{ formatValue(trade.points) }}
                    </div>
                    <div>
                        <span :class="getValueClass(getCumulativeSum([...list.trades].reverse().indexOf(trade)))">
                            {{ formatValue(getCumulativeSum([...list.trades].reverse().indexOf(trade))) }}
                        </span>
                    </div>
                    <div v-if="selectedMode === 'mode1'">
                        <span :class="getValueClass(getGainValue(trade))">
                            {{ formatValue(getGainValue(trade)) }}
                        </span>
                    </div>
                    <div v-if="selectedMode === 'mode1'">
                        <span :class="getValueClass(getCumulativeGain([...list.trades].reverse().indexOf(trade)))">
                            {{ formatValue(getCumulativeGain([...list.trades].reverse().indexOf(trade))) }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 w-full">
                        <UInput v-model="trade.comment" @change="updateTradeComment(trade.id, trade.comment)" :placeholder="$t('trades.commentPlaceholder')" class="w-full" />
                    </div>
                </div>
                <div v-if="list.trades.length === 0" class="text-gray-500 text-center py-2">
                    {{ $t('trades.noHistory') }}
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { TradeList } from '~/types'
import { getWinRate, getGain } from '~/utils/trade'
const { t } = useI18n()

const props = defineProps<{
    list: TradeList
    pointValues: number[]
}>()

const emit = defineEmits<{
    (e: 'addTrade', points: number): void
    (e: 'deleteTrade', tradeId: number): void
    (e: 'updateComment', tradeId: number, comment: string): void
    (e: 'clearTrades'): void
}>()

const settings = ref<any>(null)
const selectedMode = ref(props.list.mode || 'normal')

// Émettre un événement quand le mode change
watch(selectedMode, async (newMode) => {
    try {
        const response = await fetch(`/api/trade-lists/${props.list.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mode: newMode })
        })
        if (!response.ok) {
            console.error('Failed to update mode')
        }
    } catch (error) {
        console.error('Error updating mode:', error)
    }
})

// Charger les paramètres
onMounted(async () => {
    try {
        settings.value = await $fetch('/api/settings')
    } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error)
    }
})

const addTrade = (points: number) => {
    emit('addTrade', points)
}

const deleteTrade = (tradeId: number) => {
    emit('deleteTrade', tradeId)
}

const updateTradeComment = (tradeId: number, comment: string) => {
    emit('updateComment', tradeId, comment)
}

const clearTrades = () => {
    if (confirm(t('trades.confirmClear'))) {
        emit('clearTrades')
    }
}

const getCumulativeSum = (currentIndex: number): number => {
    if (!props.list?.trades) return 0
    return [...props.list.trades]
        .reverse()
        .slice(currentIndex)
        .reduce((sum, trade) => sum + trade.points, 0)
}

const getCumulativeGain = (currentIndex: number): number => {
    if (!props.list?.trades) return 0
    return [...props.list.trades]
        .reverse()
        .slice(currentIndex)
        .reduce((sum, trade) => sum + getGain(trade, selectedMode.value), 0)
}

const getValueClass = (value: number): string => {
    return value >= 0 ? 'text-green-600' : 'text-red-600'
}

const formatValue = (value: number): string => {
    return value > 0 ? `+${value}` : `${value}`
}

const getWinRateValue = (): number => {
    return getWinRate(props.list, settings.value)
}

const getGainValue = (trade: any): number => {
    return getGain(trade, selectedMode.value)
}
</script>
