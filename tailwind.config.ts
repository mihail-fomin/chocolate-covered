import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                red: {
                    50: '#FFF2F4',
                    100: '#FFE3E8',
                    200: '#FFCCD5',
                    300: '#fec0c1',
                    400: '#F77288',
                    500: '#F04360',
                    600: '#DB2544',
                    700: '#BA1C36',
                    800: '#991C30',
                    900: '#801D2E',
                },
            },
        },
    },
    plugins: [],
}
export default config
