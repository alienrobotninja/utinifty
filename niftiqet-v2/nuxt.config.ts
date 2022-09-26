// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  head: {
    title: 'Niftiqet',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap'
    },
      {
        rel: 'stylesheet',
        href: 'https://cdn.cryptofonts.com/1.4.0/cryptofont.css'
      }
    ]
  },
  css: [
    '~/assets/scss/style.scss',
    '~/assets/iconsax.css',
    '~/assets/cryptofont.min.css'
  ],
    modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@formkit/nuxt'],
    colorMode: {
        preference: 'system', // default theme
        dataValue: 'theme', // activate data-theme in <html> tag
        classSuffix: '',
    },
    runtimeConfig: {
        public: {
          GQL_HOST: process.env.PUBLIC_MINTBASEJS_NETWORK === 'testnet'
          ? process.env.GRAPH_TESTNET_HTTPS_URI
          : process.env.GRAPH_MAINNET_HTTPS_URI, // overwritten by process.env.GQL_HOST
          API_KEY: process.env.PUBLIC_MINTBASEJS_API_KEY,
          PUBLIC_MINTBASEJS_NETWORK: process.env.PUBLIC_MINTBASEJS_NETWORK
        }
      }
})
