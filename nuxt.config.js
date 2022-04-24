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
    "~/plugins/vCalendar.client",
  ],
  modules: [
    "~/modules/auth",
    "~/modules/algolia",
    "~/modules/cloudinary",
    "@nuxtjs/cloudinary",
  ],
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  cloudinary: {
    cloudName: "dzxztzdg4",
  },
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dzxztzdg4/image/upload/",
    },
  },
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
    algolia: {
      appId: "QXGX8RCAML",
      key: "f0ecada6cb5d32e6496eb1e42c3d7bbd",
    },
    cloudinary: {
      apiKey: "751854148899179",
    },
  },
  privateRuntimeConfig: {
    algolia: {
      appId: "QXGX8RCAML",
      key: "739175c49753db77b422766b417678b1",
    },
    cloudinary: {
      apiSecret: "Hner5MurgYTJLMQQ9F36P8msRN0",
    },
  },
};
