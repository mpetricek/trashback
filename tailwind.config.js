const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            green: colors.green,
            gray: colors.coolGray,
            red: colors.rose,
            yellow: colors.amber,
            purple: colors.violet,
            purple: colors.violet,
            blue: colors.blue,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
