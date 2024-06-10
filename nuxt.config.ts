// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/robots',
    '@nuxt/ui',
    "@nuxtjs/plausible",
    "@nuxt/eslint",
    "@nuxt/fonts"
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
    },
  },

  nitro: {
    experimental: {
      openAPI: {
        ui: {
          scalar: {
            theme: 'purple'
          }
        },
        meta: {
          title: "SPLRGE Jobs",
          description: "Discover open positions @ SPLRGE",
          version: "1.0"
        }
      }
    }
  },

  fonts: {
    families: [
      { name: 'Lexend', provider: 'google' }
    ]
  },

  plausible: {
    apiHost: 'https://analytics.splrge.dev'
  },

  ui: {
    icons: ['mdi'],
  },

  // colorMode: {
  //   preference: 'dark',
  // },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'Lexend': [400, 700],
    },
  },

  fontMetrics: {
    fonts: ['Open Sans'],
  },

  runtimeConfig: {
    jwtSecret: '',
    saltRounds: 10,
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})