<template>
  <div class="min-h-screen bg-gray-100">
    <!-- En-tête -->
    <header class="bg-white shadow">
      <nav class="container mx-auto px-4 py-4">
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/" class="text-gray-700 hover:text-gray-900">Accueil</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/settings" class="text-gray-700 hover:text-gray-900">Paramètres</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Contenu principal -->
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Le layout par défaut sera utilisé pour toutes les pages
</script>
