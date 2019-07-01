<template>
  <v-app >
    <!-- <v-navigation-drawer
          persistent
          :mini-variant="miniVariant"
          :clipped="clipped"
          v-model="drawer"
          enable-resize-watcher
          app
      temporary
          width="220"
        >
      <v-list dense>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click="$router.push(item.to)"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="white lighten-1"
      dense
      app
      card
      :clipped-left="clipped">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="title" 
          @click="$router.push('/')"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn>ログイン</v-btn>
    </v-toolbar> -->





    <v-content>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-spacer></v-spacer>
              <v-btn>ログイン</v-btn>
        </v-layout>
      </v-container>
      <!-- <v-container text-xs-center > -->
        <nuxt />
      <!-- </v-container> -->
    </v-content>




    <v-card height="200px" flat>
      <!-- <div class="headline text-xs-center pa-5">
        Active: {{ bottomNav }}
      </div> -->
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
          value="nearby">
          <span>Nearby</span>
          <v-icon>place</v-icon>
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
  max-width: 1120px;
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