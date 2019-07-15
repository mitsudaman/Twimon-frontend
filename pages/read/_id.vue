<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap justify-center mt-4>
        <v-flex sm8>
          <h2 class="blackboard">プロフィール</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center mt-3>
        <v-flex sm5 class="profile">
          <v-layout row wrap justify-center>
            <v-flex xs6>
              <div>
                <v-img 
                class="image"
                v-if="user.img_src"
                v-bind:src="require('~/assets/img/gattyo/' + user.img_src)" aspect-ratio="1"></v-img>
              </div>
              <div text-center>
                No.???
              </div>
            </v-flex>
            <v-flex xs6 text-lef
            :class="{'mt-0': $vuetify.breakpoint.smAndDown, 'mt-4': $vuetify.breakpoint.lgAndUp}">
              <div class="pt-4 pl-2 text-xs-left">
                <p>{{ user.name }}</p>
                <p>{{ user.title }}</p>
                <p>{{ user.feature1 }} {{ user.feature1_content }}</p>
                <p>{{ user.feature2 }} {{ user.feature2_content }}</p>
              </div>
            </v-flex>
          </v-layout>
          <hr style="border: 1px solid #000;">
          <div class="mt-3">
            <p>ふくおかに せいそくする うぇぶの ぷろぐらまー。</p>
            <p>ぶらっくな かいしゃから すぐいなくなる。2びょう</p>
            <p>かんに 1000もじの コードを かくことができる。</p>
          </div>
        </v-flex>
      </v-layout>
      <v-layout 
      row wrap justify-center>
        <v-flex
          d-flex
          xs11
          sm5
          class="balloon_area mt-5 pa-3"
        > 
          <v-layout row wrap>
            <v-flex
              xs6>
              <v-btn
              :block=true
              :large=true
              @click="commandTalk"
              color="grey darken-3 white--text">
                <span class="command_context">
                  <i class="far fa-comment-dots"></i> はなす
                </span>
              </v-btn>
            </v-flex>
            <v-flex 
              xs6>
              <v-btn
              :block=true
              :large=true
              @click="commandSearch"
              color="grey darken-3 white--text">
                <span class="command_context">
                  <i class="fas fa-search"></i> しらべる
                </span>
                </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn
              :block=true
              :large=true
              @click="commandMagic"
              color="grey darken-3 white--text">
                <span class="command_context">
                  <i class="fas fa-hat-wizard"></i> じゅもん
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>


    </v-container>
  </div>
</template>

<script>
import getUserGql from '~/apollo/queries/getUser.gql'

export default {
  data() {
    return {
      name: "",
      title: "",
      height: "",
      weight: "",
      user: {
      }
    }
  },
  apollo: {
    user: {
      query: getUserGql,
      variables() {
        return {
          userId: this.$route.params.id
        };
      },
    }
  },
  methods: {
    commandTalk (){
      console.log(this.$route.params.id)
    },
  }
}
</script>
<style type="text/css">
h2 {
  font-size: 2.5em;
  border: 2px solid black;
  border-radius: 1em;
}
.skill_svg {
  font-size: 1.6em;
  border-radius: 1em;
}
.card {
  font-size: 1.6em;
  border: 2px solid black;
  border-radius: 1em;
}
.blackboard {
  padding: 1rem;
  color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: inset 0 0 0 4px #fff;
  background-color: rgba(0,0,0,.9);
  /* font-family: 'PixelMplus'; */
}
.profile {
  border: 6px double #000;
  /* margin: 10px; */
  /* font-family: 'PixelMplus'; */
}
.service_title{
  font-size: 2em;
}
.image{
   border-radius: 6%;
}
.balloon_area{
  background-color: rgba(0, 0, 0, 0.6)!important;
  border: 2px solid white;
  border-radius: 1em;
}
</style>