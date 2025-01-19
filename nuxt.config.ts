export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    ssr: false,
    modules: [
        '@nuxt/ui',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxt/content',
    ],
    plugins: [
        // { src: '~/plugins/pinia-persist', mode: 'client' },
    ],
    tailwindcss: {
        cssPath: '@/assets/css/main.scss',
    },
    ui: {
        global: true,
        icons: ['heroicons']
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    colorMode: {
        preference: 'system',
        fallback: 'light',
        classSuffix: '',
    },
    devtools: { enabled: true },
})
