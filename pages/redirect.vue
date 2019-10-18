<template>
  <div>
    <my-page-nav></my-page-nav>
    <p>Twitterへリダイレクトしています</p>
  </div>
</template>

<script>
// import axios from 'axios'
import MyPageNav from '~/components/MyPageNav.vue'

export default {
  components: {
    MyPageNav
  },
  asyncData ({ app,context, error }) {
    return app.$axios.$get('/api/login/twitter')
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