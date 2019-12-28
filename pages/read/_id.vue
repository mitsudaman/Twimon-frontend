<template>
  <div>
    <v-container>
      <template v-if="user == null">
        <v-row>
          <v-col>
            <p class="mb-5 headline font-weight-bold text-center">モンスターが登録されていないよ！</p>
          </v-col>
        </v-row>
      </template>
      <template v-else>
      <v-layout row justify-center>
        <v-dialog
          v-model="loginDialog"
          max-width="400">
          <v-card>
            <v-card-title class="headline">いいね するにはログインが必要です。ログインしますか？</v-card-title>
            <v-card-actions class="text-xs-right">
              <v-spacer></v-spacer>
              <v-btn
                round
                color="blue darken-1"
                text
                @click="$router.replace({ path: '/login'})">
                ログインする
              </v-btn>
              <v-btn
                round
                color="darken-1"
                @click="loginDialog = false">
                ログインしない
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-row
        justify="center">
        <v-col cols="12" class="pb-0">
          <v-row
          align="center"
          no-gutters>
            <v-col cols="2" class="text-center">
              <nuxt-link 
                v-if="user.id>1"
                :to="'/read/' + (Number(user.id)-1)"
                class="arrowLink">
                <v-icon class="arrowIcon" :color="$vuetify.theme.themes.light.background">mdi-chevron-left</v-icon>
              </nuxt-link>
            </v-col>
            <v-col cols="8" class="text-center headline font-weight-bold">
              <p class="mb-0">{{ user.serial_number | serialNumFormatter }}</p>
              <p class="mb-0">{{user.name}}</p>
            </v-col>
            <v-col cols="2" class="text-center">
              <nuxt-link 
                :to="'/read/' + (Number(user.id)+1)"
                class="arrowLink">
                <v-icon class="arrowIcon" :color="$vuetify.theme.themes.light.background">mdi-chevron-right</v-icon>
              </nuxt-link>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="11" class="py-0">
          <v-row>
            <v-col></v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right headline py-0">
              <a 
                v-bind:href="'https://twitter.com/share?text=やせいの ' + user.name + ' が あらわれた！&hashtags=ツイットモンスター&url=https://twimon-backend.herokuapp.com/og/'+ $route.params.id"
                target="_blank" 
                rel="noopener"
                class="mr-2"
                role="button">
                <i class="fab fa-twitter blue--text"></i>
              </a>
              <button 
              v-if="likedFlg"
              @click="delLikeUsr()">
                <i  
                  v-bind:class="{ like_active: likedFlg, heart_break: onLikedFlg }"
                class="fas fa-heart"></i>
              </button>
              <button 
              v-else
              @click="addLikeUsr()">
                <i 
                  class="far fa-heart text-grey"></i>
              </button>
              <span class="text-grey ml-1">{{likeSum}}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col
        cols="11"
        :class="{'back-ground-color-sm-and-down': $vuetify.breakpoint.smAndDown}">
          <v-card flat
            :style="{border: 'solid 2px' + $vuetify.theme.themes.light.background + '!important' }">
            <v-row 
              align="center"
              justify="center"
              no-gutters>
              <v-col cols="12" md="6" class="pa-1 pa-md-3">
                <v-img
                v-bind:src="user.sns_img_url" 
                class="image"
                aspect-ratio="1">
                </v-img>
              </v-col>
              <v-col md="6">
                  <v-card-subtitle class="pt-2 pb-0 mb-1">
                    <h2><span>せつめい</span></h2>
                  </v-card-subtitle>
                  <v-card-text class="font-weight-bold pb-0 description">
                    <p>{{user.description1}}{{user.description2}}{{user.description3}}</p>
                    <v-row
                      align="center">
                      <v-col cols="10" class="font-weight-bold subtitle-1 py-0">タイプ</v-col>
                      <v-col cols="5" class="text-center pt-1">
                        <v-card v-if="user.type1" outlined :color="user.type1 | getTypeColor" class="white--text caption font-weight-bold type_area"> {{user.type1}} </v-card>
                      </v-col>
                      <v-col cols="5" class="text-center pt-1">
                        <v-card v-if="user.type1" outlined :color="user.type2 | getTypeColor" class="white--text caption font-weight-bold type_area"> 
                          {{ user.type2 }}
                          </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-layout row justify-center>
        <v-dialog
          v-model="dialog"
          max-width="400">
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" fab dark small color="primary">
                <v-icon dark>remove</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-title class="headline">{{user.name}}のひみつ</v-card-title>
            <v-card-text>
              <p v-if="user.url1">
                <i class="fas fa-link"></i>
                <a class="ml-1" :href="user.url1">
                  <template v-if="user.url1_name">{{user.url1_name}}</template>
                  <template v-else>{{user.url1}}</template>
                </a>
              </p>
              <p v-if="user.url2">
                <i class="fas fa-link"></i>
                <a class="ml-1" :href="user.url2">
                  <template v-if="user.url2_name">{{user.url2_name}}</template>
                  <template v-else>{{user.url2}}</template>
                </a>
              </p>
              <p v-if="user.url3">
                <i class="fas fa-link"></i>
                <a class="ml-1" :href="user.url3">
                  <template v-if="user.url3_name">{{user.url3_name}}</template>
                  <template v-else>{{user.url3}}</template>
                </a>
              </p>
              <p v-if="user.url4">
                <i class="fas fa-link"></i>
                <a class="ml-1" :href="user.url4">
                  <template v-if="user.url4_name">{{user.url4_name}}</template>
                  <template v-else>{{user.url4}}</template>
                </a>
              </p>
              <p v-if="user.url5">
                <i class="fas fa-link"></i>
                <a class="ml-1" :href="user.url5">
                  <template v-if="user.url5_name">{{user.url5_name}}</template>
                  <template v-else>{{user.url5}}</template>
                </a>
              </p>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-layout 
      row wrap justify-center>
        <v-flex
          d-flex
          sm8
          class="balloon_area mt-3 pa-3"
        > 
          <v-layout v-if="!talkViewFlg" row wrap>
            <v-flex
              xs6>
              <v-btn
              :block=true
              :large=true
              rounded
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
              rounded
              @click.stop="dialog = true"
              color="grey darken-3 white--text">
                <span class="command_context">
                  <i class="fas fa-search"></i> しらべる
                </span>
                </v-btn>
            </v-flex>
          </v-layout>
          <v-layout v-else row wrap>
            <v-flex
              xs12
              class="balloon_area_context"
              @click="talkNext"
              >
              <p class="text-xs-left">{{talkSentence}}</p>
              <p class="next-arrow">▼</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>



      </template>
    </v-container>
  </div>
</template>

<script>
import GET_USER_GQL from '~/apollo/queries/getUser.gql'
import ADD_OR_DELETE_LIKE_UAER_GQL from '~/apollo/mutations/addOrDeleteLikeUser.gql'

export default {
  middleware: 'authenticate',
  transition (to, from) {
    if (from && (from.name === 'index' || from.name === 'favorite')) return 'read'
  },
  data () {
    return {
      likeSum: 0,
      likedFlg: false,
      onLikedFlg: false,
      user: {
      },
      talkIndex: 0,
      sentenceIndex: 1,
      talks: [],
      nowTalk: [],
      talkViewFlg: false,
      talkSentence: null,
      dialog: false,
      loginDialog: false,
      test: "",
    }
  },
  asyncData (context) {
    let client = context.app.apolloProvider.defaultClient
    const userData = client.query({
      query: GET_USER_GQL,
      variables: { userId: context.params.id},
    }).then(({data}) => {
        return { 
          user: data.user, 
          talks: data.user.talks,
          likeSum: data.user.like_ct,
          likedFlg: data.user.liked
        }
    }).catch(() => {
      return { 
          user: null, 
          talks: null,
          likeSum: null,
          likedFlg: null
        }
    })
    return userData
  },
  head () {
    if(this.user){
      return {
        title: "ツイットモンスター | " + this.user.name,
        meta: [
          { hid: 'og:description', name: 'description', content: this.user.description1 + " " + this.user.description2 + " " + this.user.description3 },
          { hid: 'og:image', property: 'og:image', content: this.user.ogp_img_url },
        ],
      }
    }
  },
  methods: {
    addLikeUsr () {
      if(!this.$store.state.isLoggedIn) {
        this.loginDialog = true;
        return;
      }
      this.likeSum++
      this.likedFlg = true
      this.onLikedFlg = true
      this.updateLike()
    },
    delLikeUsr () {
      this.likeSum--
      this.likedFlg = false
      this.onLikedFlg = false
      this.updateLike()
    },
    updateLike () {
      this.$apollo.mutate({
        mutation: ADD_OR_DELETE_LIKE_UAER_GQL,
        variables: {
          like_user_id: this.$route.params.id
        }
      }).then(({ data }) => {
      })
    },
    commandTalk () {
      this.talkViewFlg = true
      this.sentenceIndex = 1
      this.nowTalk = this.talks[this.talkIndex % this.talks.length]
      this.talkSentence = this.nowTalk ? this.nowTalk.sentence1 : ''
    },
    talkNext () {
      this.sentenceIndex++
      if (this.sentenceIndex === 2) {
        if (this.nowTalk && this.nowTalk.sentence2) {
          this.talkSentence = this.nowTalk.sentence2
        } else {
          this.talkSentence = ''
        }
      } else if (this.sentenceIndex === 3) {
        if (this.nowTalk && this.nowTalk.sentence3) {
          this.talkSentence = this.nowTalk.sentence3
        } else {
          this.talkEnd()
        }
      } else {
        this.talkEnd()
      }
    },
    talkEnd () {
      this.talkIndex++
      this.talkViewFlg = false
    }
  }
}
</script>
<style type="text/css">
.arrowLink{
  text-decoration: none;
}
.arrowIcon{
  font-size:70px !important;
}
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
  font-family: 'PixelMplus';
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
.balloon_area_context{
  color: white;
  font-size: 1.4em;
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
.heart_break{
  animation: anime1 0.1s  ;
}
.text-grey{
  color: #a8abb1;
}
.like_active {
  color:#ea3f60;
}
@keyframes anime1{
0% { transform: scale(1); }
20% { transform: scale(1.1); }
40% { transform: scale(1.3); }
60% { transform: scale(1.5); }
80% { transform: scale(1.3); }
100% { transform: scale(1); }
}
</style>