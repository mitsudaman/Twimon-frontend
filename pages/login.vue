<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row justify-center align-center>
        <v-flex xs10>
          <v-card class="rounded-card">
            <v-layout justify-center align-center>
              <v-flex xs11 mt-4 pb-0 title>
                <p>ボタンをクリックするとTwitterログイン画面に移動します</p>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex pb-4>
                <v-btn
                round
                :loading="loading"
                class="btn-tw"
                @click="onLogin()">
                  <i class="fab fa-twitter"></i>ログイン
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex pb-4>
                <v-btn
                round
                class="btn-tw"
                @click="loginFlg=!loginFlg">{{loginFlg}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row justify-center align-center mt-5>
        <v-flex xs10>
          <v-card class="rounded-card">
            <v-layout justify-center align-center>
              <v-flex xs11 mt-4 pb-4>
                <p class="subheading">ツイットモンスターは個人を識別するためにTwitterアカウントの連携を必要としています。</p>
                <ul>
                  <li>連携許可をログイン以外の目的で使用することはありません。</li>
                  <li>あなたのアカウントからツイートすることはありません。</li>
                  <li>DMなどを勝手に送信することはありません。</li>
                  <li>{{this.$cookies.get('laravel_session')}}</li>
                  <li>
      axios.get(process.env.baseUrl + '/api/login/twitter' + '?nocache=' + new Date().getTime(), {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': 0 },
        xsrfHeaderName: 'X-CSRF-Token',
        withCredentials: true
      }).then(response => {
        window.location.href = response.data
      })</li>
                </ul>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  components: {
  },
  data () {
    return {
      loading: false,
      loginFlg: false
    }
  },
  methods: {
    async onLogin () {
      this.loading = true
      // console.log(process.env.baseUrl)
      //   console.log(this.$cookies.get('aaaa'))
      //   return
      // axios.defaults.withCredentials = true;
      // axios.get(process.env.baseUrl + '/api/login/twitter' + '?nocache=' + new Date().getTime(), {
      //   headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': 0 },
      //   xsrfHeaderName: 'X-CSRF-Token',
      //   withCredentials: true
      // }).then(response => {
      //   console.log(response)
      //   if(this.loginFlg) window.location.href = response.data
      // })
      await this.$axios.$get('/api/login/twitter').then(response => {
        console.log(response)
        if(this.loginFlg) window.location.href = response
      })
      // axios.get(process.env.baseUrl + '/api/login/twitter', {
      //   withCredentials: true
      // }).then(response => {
      //   if(this.loginFlg) window.location.href = response.data
      // })
    }
  }
}
</script>