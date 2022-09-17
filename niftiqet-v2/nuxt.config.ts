// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@vuestic/nuxt'],
    colorMode: {
        preference: 'system', // default theme
        dataValue: 'theme', // activate data-theme in <html> tag
        classSuffix: '',
    },
    vuestic: {
        config: {
            colors: {
                // Default colors
                primary: '#23e066',
                secondary: '#002c85',
                success: '#40e583',
                info: '#2c82e0',
                danger: '#e34b4a',
                warning: '#ffc200',
                gray: '#babfc2',
                dark: '#34495e',

                // Custom colors
                yourCustomColor: '#d0f55d',
            },
        }
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
