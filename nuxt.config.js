require('dotenv').config()
module.exports = {
  // mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'ツイットモンスター',
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
    '~/plugins/vuetify.js'
    // '~/plugins/konva',
  ],
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/main.styl',
    '~/assets/main.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { parseJSON: false }],
    // 'nuxt-client-init-module'
  ],
  apollo: {
    tokenName: 'twimonToken',
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network'
      }
    },
    clientConfigs: {
      default: {
        // Graphpack側のエンドポイントを指定します。
        // httpEndpoint: 'http://stark-ravine-37952.herokuapp.com/graphql',
        httpEndpoint: process.env.HTTP_ENDPOINT
        // httpEndpoint: 'https://twimon-backend.herokuapp.com/graphql',
        // httpEndpoint: 'https://damp-wildwood-50383.herokuapp.com/graphql',
        // // Subscription用にWebSocketの設定も追加します。
        // wsEndpoint: 'ws://localhost:4000/graphql',
        // websocketsOnly: true,
      }
    }
  },
  env: {
    baseUrl: process.env.API_URL
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
  },
  axios: {
    baseURL: process.env.API_URL,
    browserBaseURL: process.env.API_URL_BROWSER,
    credentials: true,
    // proxy: true
  },
  // proxy: {
  //   '/api': {
  //     target: process.env.API_URL,
  //     // pathRewrite: {
  //     //   '^/api' : '/'
  //     //   }
  //     }
  // }
}
