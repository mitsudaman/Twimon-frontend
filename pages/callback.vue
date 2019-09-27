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
import axios from 'axios'

export default {
  data () {
    return {
      failedMessage: null
    }
  },
  async mounted () {
    try {
      const callbackData = await axios.get(process.env.baseUrl + 'api/login/callback', {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': 0 },
        params: this.$route.query,
        withCredentials: true
      })
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