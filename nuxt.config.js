module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'twimon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
  ],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/apollo',
  ],
  apollo: {
    clientConfigs: {
      default: {
        // Graphpack側のエンドポイントを指定します。
        httpEndpoint: 'http://stark-ravine-37952.herokuapp.com/graphql',
        // // Subscription用にWebSocketの設定も追加します。
        // wsEndpoint: 'ws://localhost:4000/graphql',
        // websocketsOnly: true, 
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
      // // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
