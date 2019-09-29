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
                  <li>axios.get(process.env.baseUrl + 'api/login/twitter/' , { 
        headers: { 'Cache-Control': 'no-cache' , 'Pragma': 'no-cache', 'Expires': 0 },
        withCredentials: true 
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
import axios from 'axios'

export default {
  components: {
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onLogin () {
      this.loading = true
      console.log(process.env.baseUrl)
      // this.$apollo.query({
      //     query: GET_REDIRECT_URL_GQL
      // }).then(({data}) => {
      //   window.location.href = data.getRedirectUrl
      // })
      axios.get(process.env.baseUrl + 'api/login/twitter' + '?nocache=' + new Date().getTime(), {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': 0 },
        withCredentials: true,
        xsrfHeaderName: 'X-CSRF-Token'
      }).then(response => {
        window.location.href = response.data
      })
    }
  }
}
</script>