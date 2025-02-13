<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">{{ $t('settings.title') }}</h1>

        <div class="bg-white shadow rounded-lg p-6 my-2">
            <h2 class="text-xl font-semibold mb-4">{{ $t('settings.general') }}</h2>
            <div class="flex items-center">
                <input type="checkbox" v-model="winrateForNull" id="winrateForNull" class="mr-2" />
                <label for="winrateForNull">{{ $t('settings.winrateForNull') }}</label>
            </div>
        </div>
       
        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4">{{ $t('settings.pointValues') }}</h2>

            <form @submit.prevent="saveSettings" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <!-- Points positifs -->
                    <div>
                        <h3 class="font-medium mb-2">{{ $t('settings.positivePoints') }}</h3>
                        <div class="space-y-2">
                            <div v-for="(value, index) in positivePoints" :key="index" class="flex items-center space-x-2">
                                <input v-model="positivePoints[index]" type="number" min="0" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                <button type="button" @click="removePositivePoint(index)" class="text-red-500 hover:text-red-600">
                                    ×
                                </button>
                            </div>
                            <button type="button" @click="addPositivePoint" class="text-sm text-blue-500 hover:text-blue-600">
                                + {{ $t('settings.addValue') }}
                            </button>
                        </div>
                    </div>

                    <!-- Points négatifs -->
                    <div>
                        <h3 class="font-medium mb-2">{{ $t('settings.negativePoints') }}</h3>
                        <div class="space-y-2">
                            <div v-for="(value, index) in negativePoints" :key="index" class="flex items-center space-x-2">
                                <input v-model="negativePoints[index]" type="number" max="-1" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                <button type="button" @click="removeNegativePoint(index)" class="text-red-500 hover:text-red-600">
                                    ×
                                </button>
                            </div>
                            <button type="button" @click="addNegativePoint" class="text-sm text-blue-500 hover:text-blue-600">
                                + {{ $t('settings.addValue') }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end">
                    <UButton color="green" variant="solid" type="submit">
                        {{ $t('settings.save') }}
                    </UButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const router = useRouter();
const positivePoints = ref<number[]>([])
const negativePoints = ref<number[]>([])
const winrateForNull = ref<boolean>(false)

// Charger les paramètres
onMounted(async () => {
    try {
        const settings = await $fetch('/api/settings')
        const pointValues: number[] = settings?.pointValues as number[]
        const options = settings?.options as { winrateForNull: boolean }

        positivePoints.value = pointValues.filter(v => v >= 0).sort((a, b) => a - b)
        negativePoints.value = pointValues.filter(v => v < 0).sort((a, b) => b - a)
        winrateForNull.value = options?.winrateForNull ?? false
    } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error)
    }
})

// Ajouter/Supprimer des points
const addPositivePoint = () => positivePoints.value.push(1)
const addNegativePoint = () => negativePoints.value.push(-1)
const removePositivePoint = (index: number) => positivePoints.value.splice(index, 1)
const removeNegativePoint = (index: number) => negativePoints.value.splice(index, 1)

// Sauvegarder les paramètres
const saveSettings = async () => {
    try {
        const pointValues = [...positivePoints.value, ...negativePoints.value]
        const options = {
            winrateForNull: winrateForNull.value
        }
        await $fetch('/api/settings', {
            method: 'PUT',
            body: { pointValues, options }
        })
        router.push('/');
        // Afficher un message de succès si nécessaire
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des paramètres:', error)
    }
}
</script>
