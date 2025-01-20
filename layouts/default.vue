<template>
    <div class="min-h-screen bg-gray-100">
        <!-- En-tête -->
        <header class="bg-white shadow">
            <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
                <ul class="flex space-x-4 items-center">
                    <li class="mr-8">
                        <NuxtLink to="/" class="flex items-center">
                            <Logo :width="280" :height="40" />
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="text-gray-700 hover:text-gray-900">{{ $t('menu.home') }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/settings" class="text-gray-700 hover:text-gray-900">{{ $t('menu.settings') }}</NuxtLink>
                    </li>
                </ul>
                <button @click="toggleLanguage" class="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span class="font-medium">{{ $t('language.switch') }}</span>
                </button>
            </nav>

        </header>
        <!-- Contenu principal -->
        <main class="container mx-auto px-4 py-8">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const { locale, t, setLocale } = useI18n()

// Initialiser la locale depuis le localStorage au chargement
onMounted(() => {
    const savedLocale = localStorage.getItem('i18n-locale')
    if (savedLocale) {
        setLocale(savedLocale)
    }
})

function toggleLanguage() {
    const newLocale = locale.value === 'fr' ? 'en' : 'fr'
    setLocale(newLocale)
    localStorage.setItem('i18n-locale', newLocale)
}

// Le layout par défaut sera utilisé pour toutes les pages
</script>
