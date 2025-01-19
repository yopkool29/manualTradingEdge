<template>
  <div>
    <!-- En-tête avec bouton d'ajout -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Listes</h1>
      <button
        @click="showNewListModal = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Nouvelle Liste
      </button>
    </div>

    <!-- Modal pour nouvelle liste -->
    <div v-if="showNewListModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Nouvelle Liste</h2>
        <form @submit.prevent="createList">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Titre</label>
            <input
              v-model="newList.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Commentaire</label>
            <textarea
              v-model="newList.comment"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showNewListModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Liste des trades -->
    <div class="space-y-6">
      <div v-for="list in lists" :key="list.id" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-xl font-semibold">{{ list.title }}</h2>
            <p class="text-gray-600">{{ list.comment }}</p>
            <p class="text-sm text-gray-500">Créé le {{ new Date(list.createdAt).toLocaleDateString() }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="router.push(`/lists/${list.id}`)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Voir détails
            </button>
            <button
              @click="deleteList(list.id)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Supprimer
            </button>
          </div>
        </div>
        <div class="text-gray-600">
          {{ list.trades?.length || 0 }} trades
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { TradeList, Settings } from '~/types'

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

// Ajouter un trade
const addTrade = async (listId: number, points: number) => {
  try {
    const newTrade = await $fetch(`/api/lists/${listId}/trades`, {
      method: 'POST',
      body: { points }
    })
    const list = lists.value?.find(l => l.id === listId)
    if (list) {
      // Convert createdAt string to Date object before adding to list
      list.trades.push({
        ...newTrade,
        createdAt: new Date(newTrade.createdAt)
      })
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du trade:', error)
  }
}

// Supprimer une liste
const deleteList = async (listId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) {
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
