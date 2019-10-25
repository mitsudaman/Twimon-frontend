<template>
  <div>
    <my-page-nav></my-page-nav>
    <p>Twitterへリダイレクトしています</p>
  </div>
</template>

<script>
import MyPageNav from '~/components/MyPageNav.vue'

export default {
  components: {
    MyPageNav
  },
  asyncData ({ app,context, error }) {
    return app.$axios.$get('/api/login/twitter')
      .then(data => {
        return { twitterAuthUrl: data.redirect_url }
      })
      .catch(e => error({ message: e.message, statusCode: e.statusCode }))
  },

  mounted () {
    window.location.href = this.twitterAuthUrl
  }
}
</script>