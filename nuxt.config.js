module.exports = {
  mode: 'spa',
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
    // '~/plugins/konva',
  ],
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/main.styl',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/apollo',
    ['cookie-universal-nuxt', {parseJSON: false}],
    'nuxt-client-init-module',
  ],
  axios: {
    credentials: true
  },
  apollo: {
    tokenName: 'twimonToken',
    clientConfigs: {
      default:{
        // Graphpack側のエンドポイントを指定します。
        // httpEndpoint: 'http://stark-ravine-37952.herokuapp.com/graphql',
        httpEndpoint: 'http://localhost:8001/graphql',
        // httpEndpoint: 'https://damp-wildwood-50383.herokuapp.com/graphql',
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
