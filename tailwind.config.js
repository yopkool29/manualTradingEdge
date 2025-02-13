/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            colors: {
                green: {
                    50: '#E1F5E9',
                    100: '#C2EBCD',
                    200: '#94D6AA',
                    300: '#65C187',
                    400: '#37AC64',
                    500: '#2A8B4E',
                    600: '#1F6A3B',
                    700: '#154928',
                    800: '#0B2815',
                    900: '#051A0D',
                    950: '#020D06',
                },
                red: {
                    50: '#FEE2E2',
                    100: '#FBC3C3',
                    200: '#F87171',
                    300: '#EF4444',
                    400: '#DC2626',
                    500: '#B91C1C',
                    600: '#991B1B',
                    700: '#7F1D1D',
                    800: '#661818',
                    900: '#4C1313',
                    950: '#330C0C',
                },
            },
        },
    },
    plugins: [],
}
