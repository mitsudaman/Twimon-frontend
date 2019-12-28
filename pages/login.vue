<template>
  <div>
    <v-container 
  :class="{'back-ground-color-sm-and-down': breakpoint.smAndDown}">
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-card class="rounded-card">
            <v-row align="center" justify="center">
              <v-col cols="11" class="mt-4 pb-0 title">
                <p>ボタンをクリックするとTwitterログイン画面に移動します</p>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="11" class="pb-4">
                <v-btn
                rounded
                block
                :loading="loading"
                class="btn-tw title"
                @click="onLogin()">
                  <i class="fab fa-twitter"></i>ログイン
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-card class="rounded-card">
            <v-row align="center" justify="center">
              <v-col cols="11" class="mt-4 pb-4">
                <p class="subheading">ツイットモンスターは個人を識別するためにTwitterアカウントの連携を必要としています。</p>
                <ul>
                  <li>連携許可をログイン以外の目的で使用することはありません。</li>
                  <li>あなたのアカウントからツイートすることはありません。</li>
                  <li>DMなどを勝手に送信することはありません。</li>
                </ul>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      isHydrated: false,
      loading: false,
    }
  },
  computed: {
    breakpoint () {
      return this.isHydrated
        ? this.$vuetify.breakpoint
        : ''
    }
  },
  mounted() {
    this.isHydrated = true
  },
  methods: {
    async onLogin () {
      this.loading = true
      await this.$axios.$get('/api/login/twitter').then(response => {
        window.location.href = response.redirect_url
      })
    }
  }
}
</script>