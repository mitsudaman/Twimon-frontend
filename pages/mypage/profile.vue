<template>
  <div>
    <v-container grid-list-xl>
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbar_color"
        :timeout=3000
      >
        <span class="snackbar_text">{{ snackbar_text }}</span>
      </v-snackbar>
      <my-page-nav></my-page-nav>
      <v-layout row justify-center align-center mt-5>
        <v-flex sm8 >
          <v-card class="rounded-card">
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex mt-4 pb-0>
                <label class="ml-1 font-weight-bold">ニックネーム</label>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex>
                <v-text-field
                  v-model="me.name"
                  outline
                  hide-details
                  placeholder="ツイモン"
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex pb-0>
                <label class="ml-1 font-weight-bold">タイトル</label>
              </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
              <v-flex xs11 d-flex>
                <v-text-field
                  v-model="me.title"
                  outline
                  hide-details
                  placeholder="ほのぼのツイモン"
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex pb-0>
                <label class="ml-1 font-weight-bold">たかさ</label>
              </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
              <v-flex xs11 d-flex>
                <v-text-field
                  v-model="me.feature1_content"
                  outline
                  hide-details
                  placeholder="15cm"
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex pb-0>
                <label class="ml-1 font-weight-bold">おもさ</label>
              </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
              <v-flex xs11 d-flex>
                <v-text-field
                  v-model="me.feature2_content"
                  outline
                  hide-details
                  placeholder="2kg"
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex pb-0>
                <label class="ml-1 font-weight-bold">せつめい</label>
              </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
              <v-flex xs11 d-flex>
                <v-textarea
                  v-model="me.description"
                  outline
                  hide-details
                  :auto-grow="true"
                  placeholder="ほのぼのしてるツイットモンスター">
                </v-textarea>
              </v-flex>
            </v-layout>
            <v-layout column justify-center align-center>
              <v-flex xs12 sm8 md6>{{imageRadioButton}}
                <v-radio-group v-model="imageRadioButton" row>
                  <v-radio label="ツイッター画像" value="1"></v-radio>
                  <v-radio label="アップロード画像" value="2"></v-radio>
                </v-radio-group>
                <input v-if="imageRadioButton=='2'" type="file" v-on:change="onFileChange">
              </v-flex>
            </v-layout>
          </v-card>
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
        <v-flex xs12 sm8 md6>
          <v-btn
            :block=true
            :large=true
            @click="onUpdateUser"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> 保存</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row justify-center align-center mt-5>
        <v-flex d-flex sm8>
          <div class="talk_form_area">
            <v-card 
              v-for="(talk,index) in me.talks"
              v-bind:key="talk.id"
              class="rounded-card mt-5">
              <v-layout 
              justify-space-between align-center>
                <v-flex xs6 d-flex mt-4 pb-0>
                  <label class="ml-1 font-weight-bold">会話{{index+1}}</label>
                </v-flex>
                <v-flex xs3  mt-4 pb-0>
                  <v-btn @click="onDeleteUserTalk(talk.id)" fab dark small color="primary">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-center align-center>
                <v-flex d-flex xs11>
                <label class="ml-1 font-weight-bold">文章1</label>
                </v-flex>
                <v-flex d-flex xs11>
                  <v-text-field
                    v-model="talk.sentence1"
                    outline
                    :rules="talkSentence1Rules"
                    single-line
                  ></v-text-field>
                </v-flex>
                <v-flex d-flex xs11>
                <label class="ml-1 font-weight-bold">文章2</label>
                </v-flex>
                <v-flex d-flex xs11>
                  <v-text-field
                    v-model="talk.sentence2"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
                <v-flex d-flex xs11>
                <label class="ml-1 font-weight-bold">文章3</label>
                </v-flex>
                <v-flex d-flex xs11>
                  <v-text-field
                    v-model="talk.sentence3"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
            <v-card
              v-for="(talk,index) in newTalks"
              v-bind:key="talk.id"
              class="rounded-card mt-5">
              <v-layout 
              justify-space-between align-center>
                <v-flex xs6 d-flex mt-4 pb-0>
                  <label class="ml-1 font-weight-bold">新規会話{{index+1}}</label>
                </v-flex>
                <v-flex xs3  mt-4 pb-0>
                  <v-btn @click="onDeleteUserNewTalk(index)" fab dark small color="primary">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-center align-center>
                <v-flex d-flex xs11>
                <label class="ml-1 font-weight-bold">文章1</label>
                </v-flex>
                <v-flex d-flex xs11>
                  <v-text-field
                    v-model="talk.sentence1"
                    outline
                    single-line
                    :rules="talkSentence1Rules"
                  ></v-text-field>
                </v-flex>
                <v-flex d-flex xs11>
                <label class="ml-1 font-weight-bold">文章2</label>
                </v-flex>
                <v-flex d-flex xs11>
                  <v-text-field
                    v-model="talk.sentence2"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
                <v-flex d-flex xs11>
                <label class="ml-1 font-weight-bold">文章3</label>
                </v-flex>
                <v-flex d-flex xs11>
                  <v-text-field
                    v-model="talk.sentence3"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <v-btn
            :block=true
            :large=true
            @click="onCreateUserTalk"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> 追加</span>
          </v-btn>
          <v-btn
            :block=true
            :large=true
            @click="onUpdateUserTalks"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> 会話保存</span>
          </v-btn>
          {{newTalks}}
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import GET_ME from '~/apollo/queries/getMe.gql'
import MyPageNav from '~/components/MyPageNav.vue'
import UPDATE_USER_PROF_GQL from '~/apollo/mutations/updateUserProf.gql'
import UPDATE_USER_TALKS_GQL from '~/apollo/mutations/updateUserTalks.gql'
import _ from 'lodash'

export default {
  middleware: 'authenticated',
  components: {
    MyPageNav
  },
  data() {
    return {
      name: '',
      title: '',
      height: '',
      weight: '',
      description: '',
      imageRadioButton: "1",
      uploadedImage: '',
      items: [
        { icon: 'apps', title: 'プロフィール', to: '/' },
        { icon: 'bubble_chart', title: 'はなす', to: '/create' }
      ],
      me: {
      },
      newTalks: [],
      delTalks: [],
      snackbar:false,
      snackbar_color: 'success',
      snackbar_text:"",
      talkSentence1Rules: [
        v => !!v || '文章1は必須です',
      ],
    }
  },
  apollo: {
    me: {
      query: GET_ME,
      update(data){
        return _.cloneDeep(data.me)
      }
    }
  },
  methods: {
    commandTalk (){
      this.me.name = "テスト"
      this.me.title = "えんじにあニセモン"
      this.me.feature1_content = "1.7mm"
      this.me.feature2_content = "りんご3こぶん"
      this.me.description = `ふくおかに せいそくする うぇぶの ぷろぐらまー。
ぶらっくな かいしゃから すぐいなくなる。2びょう
かんに 1000もじの コードを かくことができる。`;
    },
    onUpdateUser (){
       // ユーザー情報アップデート
        this.$apollo.mutate({
          mutation: UPDATE_USER_PROF_GQL,
          variables: {
            UpdateUserProfInput:  {
              name: this.me.name,
              title: this.me.title,
              feature1: this.me.feature1,
              feature1_content: this.me.feature1_content,
              feature2: this.me.feature2,
              feature2_content: this.me.feature2_content,
              description: this.me.description,
              file: file
            }
          },
        }).then(() => { 
          this.snackbar = true
          this.snackbar_text = 'プロフィールを更新しました'
        }).catch(() => {
          this.snackbar = true
          this.snackbar_color = 'error'
          this.snackbar_text = 'プロフィールを更新できませんでした'
        });
    },
    onDeleteUserTalk(delId){
      this.me.talks = _.reject(this.me.talks, { 'id': delId});
      this.delTalks.push(delId);
    },
    onDeleteUserNewTalk(index){
      this.newTalks.splice(index, 1);
    },
    onCreateUserTalk(){
      this.newTalks.push({
          sentence1: "",
          sentence2: "",
          sentence3: ""
      });
    },
    onUpdateUserTalks (){
      let updateTalks = _.map(this.me.talks,(n)=>{
        return _.pick(n, ['id','sentence1', 'sentence2','sentence3']);
      })
      // ユーザー会話情報アップデート
      this.$apollo.mutate({
        mutation: UPDATE_USER_TALKS_GQL,
        variables: {
          UpdateUserTalksInput:{
          talks: {
            create: this.newTalks,
            update: updateTalks,
            delete: this.delTalks
          }
        }
        },
      }).then(() => { 
        this.snackbar = true
        this.snackbar_text = '会話を更新しました'
      }).catch(() => {
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text = '会話を更新できませんでした'
      });
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
.image{
   border-radius: 6%;
}
.mypage_link a {
  color: #787c7b;
  text-decoration: none ;
}
.mypage_link a.nuxt-link-active{
  color: #2CB696;
}
.mypage_link a:hover{
  color: #000000;
}
.talk_form_area{
  padding: 10px;
  border: 2px solid grey;
  border-radius: 1em;
}
</style>