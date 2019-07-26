<template>
  <p>Twitterへリダイレクトしています</p>
  <!-- {{getRedirectUrl}} -->
</template>

<script>
import GET_REDIRECT_URL_GQL from '~/apollo/queries/getRedirectUrl.gql'
export default {
  // middleware: 'guest',
  data () {
    return {
      twitterAuthUrl: null
    }
  },
  asyncData ({ app, error }) {
    const axios = require('axios');
    return axios.get('http://localhost:8001/api/login/twitter')
      .then(data => {
        console.log(data)
        return { twitterAuthUrl: data }
      })
      .catch(e => error({ message: e.message, statusCode: e.statusCode }))
  },
  mounted () {
    window.location.href = this.twitterAuthUrl.data
  }
  // apollo: {
  //   getRedirectUrl: {
  //     query: GET_REDIRECT_URL_GQL,
  //     update(data){
  //       console.log(data)
  //       window.location.href = data.getRedirectUrl
  //     }
  //   },
  // },
}
</script>