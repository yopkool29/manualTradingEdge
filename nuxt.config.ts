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
        '@nuxtjs/i18n',
    ],
    // sourcemap: {
    //     server: true,
    //     client: true
    // },
    // vite: {
    //     build: {
    //         sourcemap: true
    //     }
    // },
    i18n: {
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.js' },
            { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales',
        strategy: 'no_prefix',
        // detectBrowserLanguage: {
        //     useCookie: true,
        //     cookieKey: 'i18n_redirected',
        //     redirectOn: 'root',
        // },
        // vueI18n: {
        //     legacy: false,
        //     locale: 'fr',
        //     fallbackLocale: 'fr',
        // }
    },
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
    app: {
        head: {
          link: [
            { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
          ]
        }
    },
})
