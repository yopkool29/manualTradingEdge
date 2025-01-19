<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center space-x-4">
                <button @click="router.push('/')" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center">
                    <span class="mr-2">←</span> Back
                </button>
            </div>
        </div>

        <div v-if="list" class="bg-white rounded-lg shadow-md p-6">
            <div class="mb-6">
                <input v-model="list.title" @blur="updateList" class="text-2xl font-bold w-full mb-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-500" />
                <textarea v-model="list.comment" @blur="updateList" class="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500 text-gray-600" rows="2"></textarea>
                <p class="text-sm text-gray-500 mt-2">Created on {{ new Date(list.createdAt).toLocaleDateString('en-US') }}</p>
            </div>

            <TradeList :list="list" :point-values="settings.pointValues" @add-trade="addTrade" @delete-trade="deleteTrade" @update-comment="updateTradeComment" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { TradeList, Settings } from '~/types'

const router = useRouter()
const route = useRoute()
const list = ref<TradeList>()
const settings = ref<Settings>()

onMounted(async () => {
    try {
        const [listResponse, settingsResponse] = await Promise.all([
            $fetch(`/api/lists/${route.params.id}`),
            $fetch<Settings>('/api/settings')
        ])
        list.value = listResponse
        settings.value = settingsResponse as Settings
    } catch (error) {
        console.error('Error fetching data:', error)
        router.push('/')
    }
})

const updateList = async () => {
    if (!list.value) return
    try {
        const response = await $fetch(`/api/lists/${route.params.id}`, {
            method: 'PUT',
            body: {
                title: list.value.title,
                comment: list.value.comment
            }
        })
        list.value = response
    } catch (error) {
        console.error('Error updating list:', error)
    }
}

const deleteTrade = async (tradeId: number) => {
    try {
        await $fetch(`/api/trades/${tradeId}`, {
            method: 'DELETE'
        })
        if (list.value) {
            list.value.trades = list.value.trades.filter(t => t.id !== tradeId)
        }
    } catch (error) {
        console.error('Error deleting trade:', error)
    }
}

const addTrade = async (points: number) => {
    if (!list.value) return
    try {
        const trade = await $fetch(`/api/lists/${list.value.id}/trades`, {
            method: 'POST',
            body: { points, comment: '' }
        })
        list.value.trades.push(trade)
    } catch (error) {
        console.error('Error adding trade:', error)
    }
}

const updateTradeComment = async (tradeId: number, comment: string) => {
    try {
        await $fetch(`/api/trades/${tradeId}/comment`, {
            method: 'PATCH',
            body: { comment }
        })
        if (list.value) {
            const trade = list.value.trades.find(t => t.id === tradeId)
            if (trade) {
                trade.comment = comment
            }
        }
    } catch (error) {
        console.error('Error updating trade comment:', error)
    }
}
</script>
