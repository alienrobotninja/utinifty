module.exports = {
    plugins: [require('daisyui')],
    theme: {},
    content: [
        `components/**/*.{vue,js}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `composables/**/*.{js,ts}`,
        `plugins/**/*.{js,ts}`,
        `App.{js,ts,vue}`,
        `app.{js,ts,vue}`
    ]
};
