<template>
    <div>
        <!-- En-tête avec bouton d'ajout -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">{{ $t('lists.title') }}</h1>
            <UButton @click="showNewListModal = true" color="green" variant="solid">
                {{ $t('lists.newList') }}
            </UButton>
        </div>

        <!-- Modal pour nouvelle liste -->
        <UModal v-model="showNewListModal">
            <div class="p-6 rounded-lg w-full max-w-md">
                <h2 class="text-xl font-semibold mb-4">{{ $t('lists.newList') }}</h2>
                <form @submit.prevent="createList">
                    <UFormGroup :label="$t('lists.form.title')" class="mb-4">
                        <UInput v-model="newList.title" type="text" required :placeholder="$t('lists.form.titlePlaceholder')" />
                    </UFormGroup>
                    <UFormGroup :label="$t('lists.form.comment')" class="mb-4">
                        <UTextarea v-model="newList.comment" required :placeholder="$t('lists.form.commentPlaceholder')" :rows="4" />
                    </UFormGroup>
                    <div class="flex justify-end space-x-2">
                        <UButton @click="showNewListModal = false" color="white" variant="solid">
                            {{ $t('lists.form.cancel') }}
                        </UButton>
                        <UButton type="submit" color="green" variant="solid">
                            {{ $t('lists.form.create') }}
                        </UButton>
                    </div>
                </form>
            </div>
        </UModal>

        <!-- Liste des trades -->
        <div class="space-y-6">
            <div v-for="list in lists" :key="list.id" class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h2 class="text-xl font-semibold">{{ list.title }}</h2>
                        <p class="text-sm text-gray-500 my-2">{{ $t('lists.created') }} {{ new Date(list.createdAt).toLocaleDateString() }}</p>
                        <p class="text-gray-600 whitespace-pre-wrap">{{ list.comment }}</p>
                    </div>
                    <div class="flex space-x-2">
                        <UButton @click="router.push(`/lists/${list.id}`)" color="green" variant="solid">
                            {{ $t('lists.viewDetails') }}
                        </UButton>
                        <UButton @click="deleteList(list.id)" color="red" variant="solid">
                            {{ $t('lists.delete') }}
                        </UButton>
                    </div>
                </div>
                <div class="text-gray-600">
                    {{ $t('lists.tradesCount', { count: list.trades?.length || 0 }) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { TradeList, Settings } from '~/types'
const { t } = useI18n()

const router = useRouter()
const lists = ref<TradeList[] | undefined>([])
const settings = ref<Settings>({ pointValues: [1, 5, 10, -1, -5, -10] })
const showNewListModal = ref(false)
const newList = ref({
    title: '',
    comment: ''
})

// Charger les listes et les paramètres
onMounted(async () => {
    try {
        const [listsData, settingsData] = await Promise.all([
            $fetch('/api/lists'),
            $fetch('/api/settings')
        ])
        lists.value = listsData
        settings.value = settingsData
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
    }
})

// Créer une nouvelle liste
const createList = async () => {
    try {
        const createdList = await $fetch('/api/lists', {
            method: 'POST',
            body: newList.value
        })
        lists.value = lists.value ?? []
        lists.value.unshift(createdList)
        showNewListModal.value = false
        newList.value = { title: '', comment: '' }
    } catch (error) {
        console.error('Erreur lors de la création de la liste:', error)
    }
}

// Supprimer une liste
const deleteList = async (listId: number) => {
    if (!confirm(t('lists.confirmDelete'))) {
        return
    }

    try {
        await $fetch(`/api/lists/${listId}`, {
            method: 'DELETE'
        })

        if (lists.value) {
            lists.value = lists.value.filter(l => l.id !== listId)
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la liste:', error)
    }
}
</script>
