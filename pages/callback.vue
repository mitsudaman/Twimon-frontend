<template>
  <div>
    <v-container>
      <p v-if="attempting">Twitterでログインしています。</p>
      <template v-else>
        <p>{{failedMessage}}</p>
      </template>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      failedMessage: null
    }
  },
  async mounted () {
    try {
      const callbackData = await this.$axios.get('/api/login/callback', { params: this.$route.query })
      this.$store.commit('setToken', { token: callbackData.data.access_token })
      this.$store.commit('setUser', { user: callbackData.data.me })
      this.$router.replace('/')
    } catch (error) {
      this.failedMessage = error.message
    }
  },
  computed: {
    attempting () {
      return !this.failedMessage
    }
  },
  methods: {
  }
}
</script>