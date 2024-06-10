// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
    '@pinia/nuxt',
    '@nuxtjs/robots',
    '@nuxt/ui',
    "@nuxtjs/plausible"
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
    },
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