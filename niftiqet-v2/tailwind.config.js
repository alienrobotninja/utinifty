module.exports = {
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                    "primary": "#27a0af",
                    "secondary": "#4680bd",
                    "accent": "#67D2E1",
                    "info": "#547FC9",
                    "success": "#1EE671",
                    "warning": "#D9B917",
                    "error": "#EF4444",
                    "base-content": "#0A0A0A",
                },
                dark: {
                    ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
                    "primary": "#27a0af",
                    "secondary": "#4680bd",
                    "accent": "#67D2E1",
                    "info": "#547FC9",
                    "success": "#1EE671",
                    "warning": "#D9B917",
                    "error": "#EF4444",
                    "base-content": "#FAFAFA",
                    "base-100": "#001321",
                    "base-200": "#182c34",
                    "base-300": "#122126"
                },
            },
        ],
    },
    plugins: [require('daisyui')],
    theme: {
        container: {
            center: true,
        },
    },
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