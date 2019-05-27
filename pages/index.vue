<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>.</p>
          <p>If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>.</p>
          <p>Find a bug? Report it on the github <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.</p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <br>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
      <v-btn
                :block=true
                :large=true
                @click="commandTalk"
                color="grey darken-3 white--text">
                <span><i class="far fa-comment-dots"></i> はなす</span>
                </v-btn>
    </v-flex>

{{user}}
    <!-- <div v-for="item in user" :key="item.id">
      <div>{{ item.id }}</div>
      <div>{{ item.name }}</div>
      <div>{{ item.email }}</div>
    </div> -->
  </v-layout>
</template>

<script>
import getUsersGql from '~/apollo/queries/getUsers.gql'

export default {
  data() {
    return {
      user: {
        id:1,
        name:"aa",
        email:"aaa",
      }
    }
  },
  apollo: {
    user: {
      query: getUsersGql
    }
  },
  methods: {
    commandTalk (){
      console.log("aaaaaaaaa")
    },
  }
}
</script>
<style type="text/css">
/* @font-face {
	font-family: 'PixelMplus';
	src: url(~assets/font/PixelMplus10-Regular.ttf);
} */
.balloon_area{
  background-color: rgba(0, 0, 0, 0.7)!important;
  border: 2px solid white;
  border-radius: 1em;
}
.v-btn__content {
  font-size: 1.4em;
}
.comment{
  color: white;
  font-size: 1.4em;
  margin-bottom: 0px;
}
.comment p {
  margin-bottom: 0px;
}
.next-arrow{
  animation: Flash1 1s infinite;
}
/* アニメーション */
@keyframes Flash1{
  50%{
    opacity: 0;
  }
}
.mb-6 {
  margin-bottom: 200px !important;
}
.footer-fixed {
    position: fixed;
}
.footer-fixed {
  margin-left: 1px;
  bottom: 5px;
  left: 6px;
  width: 99%;
  z-index: 3;
}
</style>