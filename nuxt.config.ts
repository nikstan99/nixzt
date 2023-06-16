// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "nixzt.",
      link: [
        {
          rel: "stylesheet",
          href: "/fontawesome/css/fontawesome.min.css",
        },
        {
          rel: "stylesheet",
          href: "/fontawesome/css/brands.min.css",
        },
        {
          rel: "stylesheet",
          href: "/fontawesome/css/solid.min.css",
        },
        {
          rel: "stylesheet",
          href: "/fontawesome/css/regular.min.css",
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
