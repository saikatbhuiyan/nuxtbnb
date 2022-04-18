export default {
  components: true,
  head: {
    titleTemplate: "NuxtBnb: %s",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: ["my-style"],
    },
    meta: [
      {
        charset: "utf-8",
      },
    ],
  },
  router: {
    prefetchLinks: false,
  },
  plugins: [
    "~/plugins/maps.client",
    "~/plugins/dataApi",
    "~/plugins/auth.client",
  ],
  modules: [],
  buildModules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/sass/app.scss"],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },
  // build: {
  //   // sass: {
  //   //   implementation: require("sass"),
  //   // },
  //   // scss: {
  //   //   implementation: require("sass"),
  //   // },
  //   transpile: ["vee-validate"],
  //   postcss: {
  //     plugins: {
  //       "postcss-custom-properties": false,
  //     },
  //   },
  //   // extractCSS: true,
  //   loaders: {
  //     limit: 0,
  //   },
  // },
  publicRuntimeConfig: {
    auth: {
      cookieName: "idToken",
      clientId:
        "261771873987-d63fk0jh603nt8mi7sq7359kh1u0t2du.apps.googleusercontent.com",
    },
  },
};
