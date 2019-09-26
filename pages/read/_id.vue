<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <!-- <v-layout row wrap justify-center>
        <v-flex sm9>
          <h2 class="blackboard">プロフィール</h2>
        </v-flex>
      </v-layout> -->
      <v-layout row wrap justify-center text-xs-right>
        <v-flex sm8 class="title">
          <a 
            v-bind:href="'https://twitter.com/share?text=やせいの' + user.name + 'があらわれた！&hashtags=ツイットモンスター&url=https://twimon-backend.herokuapp.com/og/'+ $route.params.id"
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
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center mt-3>
        <v-flex  sm8 class="profile">
          <v-layout row wrap align-center justify-center pt-2>
            <v-flex xs5>
              <div>
                <v-img
                class="image"
                v-if="user.sns_img_url"
                v-bind:src="user.sns_img_url" aspect-ratio="1"></v-img>
              </div>
              <div text-center>
                <template
                v-if="String(user.serial_number).length<4"
                >No.{{(("000") + user.serial_number ).substr(-3)}}</template>
                <template
                v-else
                >No.{{user.serial_number}}</template>
              </div>
            </v-flex>
            <v-flex xs6
            :class="{'mt-0': $vuetify.breakpoint.smAndDown, 'mt-4': $vuetify.breakpoint.lgAndUp}">
              <div class="pl-2 text-xs-left">
                <p>@{{ user.nickname }}</p>
                <p>{{ user.name }}</p>
                <p>{{ user.title }}</p>
                <p>戦闘力 {{ user.twitter_followers_count}}</p>
              </div>
            </v-flex>
          </v-layout>
          <hr style="border: 1px solid #000;">
          <div class="mt-3">
            <p>{{user.description1}}</p>
            <p>{{user.description2}}</p>
            <p>{{user.description3}}</p>
          </div>
        </v-flex>
      </v-layout>
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
          class="balloon_area mt-5 pa-3"
        > 
          <v-layout v-if="!talkViewFlg" row wrap>
            <v-flex
              xs6>
              <v-btn
              :block=true
              :large=true
              round
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
              round
              @click.stop="dialog = true"
              color="grey darken-3 white--text">
                <span class="command_context">
                  <i class="fas fa-search"></i> しらべる
                </span>
                </v-btn>
            </v-flex>
            <!-- <v-flex xs6>
              <v-btn
              :block=true
              :large=true
              round
              @click="commandMagic"
              color="grey darken-3 white--text">
                <span class="command_context">
                  <i class="fas fa-hat-wizard"></i> じゅもん
                </span>
              </v-btn>
            </v-flex> -->
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


    </v-container>
  </div>
</template>

<script>
import GET_USER_GQL from '~/apollo/queries/getUser.gql'
import ADD_OR_DELETE_LIKE_UAER_GQL from '~/apollo/mutations/addOrDeleteLikeUser.gql'

export default {
  transition (to, from) {
    if (from && (from.name === 'index' || from.name === 'favorite')) return 'read'
  },
  middleware: 'authenticated',
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
      dialog: false
    }
  },
  apollo: {
    user: {
      query: GET_USER_GQL,
      variables () {
        return {
          userId: this.$route.params.id
        }
      },
      update (data) {
        this.talks = data.user.talks
        this.likeSum = data.user.like_ct
        this.likedFlg = data.user.liked
        return data.user
      }
    }
  },
  methods: {
    addLikeUsr () {
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
          user_id: this.$route.params.id
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