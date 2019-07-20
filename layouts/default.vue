<template>
  <v-app >
    <v-layout row>
      <v-flex >
        <v-card height="60px">
          <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
                <div>Title</div>
                <v-spacer></v-spacer>
                <v-menu bottom left color="primary">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                    >
                      <v-icon>dehaze</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-btn 
                    v-if="this.$store.state.loggedIn" 
                    round
                    @click="logOut">ログアウト</v-btn>
                    <v-btn 
                    v-else 
                    round
                    class="btn-tw"
                    @click="$router.replace({ path: '/login'})">
                      <i class="fab fa-twitter"></i>ログイン
                    </v-btn>
                    <v-list-tile
                      v-for="(item, i) in items"
                      :key="i"
                      @click="$router.push(item.to)">
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>


    <v-content>
      <nuxt />
    </v-content>




    <v-card height="200px" flat>
      <v-bottom-nav
        :value="true"
        fixed>
        <v-btn
          color="teal"
          flat
          value="recent"
          @click="$router.push('/')">
          <span>HOME</span>
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn
          color="teal"
          flat
          value="favorites"
          @click="$router.push('/read/8')">
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn
          color="teal"
          flat
          value="nearby"
          @click="$router.push('/mypage/profile')">
          <span>MyPage</span>
          <v-icon>face</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>







    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'ホーム', to: '/' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ツイモン'
      }
    },
    methods: {
      logOut (){
        this.$store.commit('logOut')
        this.$router.replace({ path: '/' });
        // this.$apollo.mutate({
        //   mutation: CREATE_USER_GQL,
        //   variables: {
        //     // name: this.customer.name,
        //     // gender: this.customer.gender,
        //   }
        // })
      },
    }
  }
</script>

<style type="text/css">
@font-face {
	font-family: 'PixelMplus';
	src: url(~assets/font/PixelMplus10-Regular.ttf);
}

.container{
  max-width: 960px;
}

.rounded-card{
  border-radius:5px;
}
.rounded-card-20{
  border-radius:20px;
}
.btn-tw {
  color: white !important;
  background-color: #00aced !important;
}
.awesome-green {color: green}
.awesome-red {color: red}
.awesome-blue {color: deepskyblue}
.awesome-yellow {color:gold}
.awesome-orange {color:orange}
.awesome-darkgoldenrod {color:darkgoldenrod}
.awesome-black {color: black}
.awesome-white {color: white}
</style>