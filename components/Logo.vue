<template>
  <div :style="{ width: `${width}px`, height: `${height}px` }" class="logo-container">
    <h1 class="text-xl font-bold whitespace-nowrap">
      <span class="text-blue-600">Manual</span>
      <span class="text-green-600">Trading</span>
      <span class="text-gray-800">Edge</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import type { LogoProps } from '~/types'

withDefaults(defineProps<LogoProps>(), {
  width: 200,
  height: 50,
  isDark: false
})
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: max-content;
}

h1 {
  font-family: 'Inter', 'Arial', sans-serif;
  letter-spacing: -0.5px;
  line-height: 1;
  transition: all 0.3s ease;
}

h1:hover {
  transform: scale(1.02);
}

span {
  font-weight: 600;
}
</style>
