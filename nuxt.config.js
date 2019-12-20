require('dotenv').config()
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'ツイットモンスター',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ツイッター上に生息するモンスターの図鑑サービスです。' },
      { hid: 'og:title', property: 'og:title', content: 'ツイットモンスター' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: 'ツイッター上に生息するモンスターの図鑑サービスです。' },
      { hid: 'og:url',property: 'og:url', content: 'https://twimon.com' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ツイットモンスター' },
      { hid: 'og:image', property: 'og:image', content: 'https://twimon.com/ogp.jpg' },
      { name: 'twitter:site', content: '@twimon1000' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  plugins: [
    '~/plugins/filter.js',
    // '~/plugins/vuetify.js',
    // '@plugins/vuetify'
  ],
  css: [
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
    ['@nuxtjs/google-analytics', {
      id: 'UA-117897189-4'
    }]
  ],
  buildModules: [
    '@nuxtjs/vuetify',
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
    transpile: ['vuetify/lib'],	
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
    credentials: true,
    proxy: true
  },
  proxy: {
    '/api': process.env.API_URL,
  },
}
