<template>
  <div>
  <p>Twitterへリダイレクトしています</p>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  components: {
  },
  // data () {
  //     return {
  //       twitterAuthUrl: null,
  //     }
  // },

  asyncData ({ app,context, error }) {
    return app.$axios.$get('api/login/twitter')
      .then(data => {
        return { twitterAuthUrl: data }
      })
      .catch(e => error({ message: e.message, statusCode: e.statusCode }))
  },

  mounted () {
    window.location.href = this.twitterAuthUrl
  }
}
</script>