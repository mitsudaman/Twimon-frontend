<template>
<!-- <v-app> -->
  <v-app 
   :style="{background: $vuetify.theme.themes.light.background}">
    <div color="grey lighten-4" flat height="60px">
      <v-toolbar flat>
        <nuxt-link to='/'>
          <!-- <img src="~/assets/img/twimon.png" class="pt-1 mr-1"/> -->
          <img src="~/assets/img/logo.png" class="pt-1"/>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on">
              <client-only>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </client-only>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-btn 
                v-if="this.$cookies.get('twimonToken') && !onLogOut" 
                rounded
                @click="logOut">ログアウト</v-btn>
              <v-btn 
                v-else 
                rounded
                class="btn-tw"
                @click="$router.replace({ path: '/login'})">
                <i class="fab fa-twitter"></i>ログイン
              </v-btn>
            </v-list-item>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="$router.push(item.to)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </div>
    <div class="banner">
      <a href="https://sasakkuma.com/" target="_blank">
      <v-img 
        v-bind:src="image_src" 
        aspect-ratio="4"></v-img>
      </a>
    </div>
    <v-content class="my-md-4">
        <nuxt/>
    </v-content>

    <v-bottom-navigation app
      grow
      :value="true"
      fixed>
      <v-btn
        color="teal"
        text
        value="recent"
        @click="$router.push('/')">
        <span>HOME</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        color="teal"
        text
        value="favorites"
        @click="$router.push('/favorite')">
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        color="teal"
        text
        value="nearby"
        @click="$router.push('/mypage/profile')">
        <span>MyPage</span>
        <v-icon>mdi-face</v-icon>
      </v-btn>
    </v-bottom-navigation>
    
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'ホーム', to: '/' },
          { icon: 'apps', title: '利用規約', to: '/term' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ツイモン',
        onLogOut: false,
        image_src: require("@/assets/img/sasakuma.jpg")
      }
    },
    methods: {
      logOut () {
        this.$store.commit('logOut')
        this.$router.replace({ path: '/' })
        this.onLogOut = true
        // this.$apollo.mutate({
        //   mutation: CREATE_USER_GQL,
        //   variables: {
        //     // name: this.customer.name,
        //     // gender: this.customer.gender,
        //   }
        // })
      }
    }
  }
</script>

<style type="text/css">
@font-face {
	font-family: 'PixelMplus';
	src: url(~assets/font/PixelMplus10-Regular.ttf);
}
.title_name{
  font-size:24px;
  font-family: 'PixelMplus';
}
.banner{
  text-align: center;
  margin-top: 10px;
  padding:0 10px;
}
</style>