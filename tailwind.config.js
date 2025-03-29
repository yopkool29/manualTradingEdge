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
                    50: '#E6F6ED',
                    100: '#C3E8D1',
                    200: '#9FD9B5',
                    300: '#7BCB99',
                    400: '#57BC7D',
                    500: '#33AD61',
                    600: '#2A8B4E',
                    700: '#21693B',
                    800: '#184728',
                    900: '#0F2515',
                },
                red: {
                    50: '#FEE8E8',
                    100: '#FCCCCC',
                    200: '#FAA0A0',
                    300: '#F87474',
                    400: '#F64848',
                    500: '#F41C1C',
                    600: '#C31616',
                    700: '#921111',
                    800: '#610B0B',
                    900: '#300606',
                },
            },
        },
    },
    plugins: [],
}
