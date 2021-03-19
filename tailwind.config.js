const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}