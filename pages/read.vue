<template>
  <div>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap justify-center mt-4>
        <v-flex sm8>
          <h2>プロフィール</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center mt-5>
        <v-flex sm7 class="profile">
          <v-layout row wrap justify-center>
            <v-flex xs6 sm4>
              <div>
                <!-- <img width="100%" src="~/assets/img/mitsudama.png"/> -->
              </div>
              <div text-center>
                No.???
              </div>
            </v-flex>
            <v-flex xs6 sm4 text-lef
            :class="{'mt-0': $vuetify.breakpoint.smAndDown, 'mt-4': $vuetify.breakpoint.lgAndUp}">
              <div class="pt-4 pl-2 text-xs-left">
                <!-- <p>ミツダマ</p>
                <p>えんじにあニセモン</p>
                <p>たかさ 1.7mm</p>
                <p>おもさ りんご3こぶん</p> -->
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
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <v-btn
            :block=true
            :large=true
            @click="commandTalk"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> はなす</span>
          </v-btn>
        </v-flex>
      </v-layout>


        <!-- {{users}} -->












      <v-layout row justify-center align-center>
        <v-flex sm7 >
          <v-layout row>
            <v-flex d-flex>
              <v-text-field
                v-model="name"
                outline
                placeholder="ニックネーム"
                single-line
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex d-flex>
              <v-text-field
                v-model="title"
                outline
                placeholder="タイトル"
                single-line
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex d-flex>
              <v-text-field
                v-model="height"
                outline
                placeholder="たかさ"
                single-line
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex d-flex>
              <v-text-field
                v-model="weight"
                outline
                placeholder="おもさ"
                single-line
              ></v-text-field>
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
          userId: this.$route.query.n,
        };
      },
    }
  },
  methods: {
    commandTalk (){
      console.log(this.$route.query.n)
      this.name = "ミツダマ"
      this.title = "えんじにあニセモン"
      this.height = "1.7mm"
      this.weight = "りんご3こぶん"
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
.profile {
  border: 6px double #000;
}
.service_title{
  font-size: 2em;
}
</style>