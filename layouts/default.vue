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
                    <v-list-tile
                      v-for="(item, i) in items"
                      :key="i"
                      @click="">
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
          @click="$router.push('/read?n=8')">
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
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'ホーム', to: '/' },
          { icon: 'bubble_chart', title: 'さくせい', to: '/create' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ツイモン'
      }
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
.awesome-green {color: green}
.awesome-red {color: red}
.awesome-blue {color: deepskyblue}
.awesome-yellow {color:gold}
.awesome-orange {color:orange}
.awesome-darkgoldenrod {color:darkgoldenrod}
.awesome-black {color: black}
.awesome-white {color: white}
</style>