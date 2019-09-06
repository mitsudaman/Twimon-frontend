<template>
  <div>
    <v-container grid-list-xl>
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbar_color"
        :timeout=3000>
        <span class="snackbar_text">{{ snackbar_text }}</span>
      </v-snackbar>
      <my-page-nav></my-page-nav>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <v-btn
            :block=true
            :large=true
            @click="onVisibleTalkPanel"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> みる</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout v-if="settingPanel"
       row justify-center align-center mt-5>
        <v-flex>
          <v-card class="rounded-card pb-5">
            <v-layout justify-center align-center>
              <v-flex xs11  mt-4 pb-0  align-center>
                <div class="svg_area">
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512.05 512.05" class="reaction_list_svg" style="enable-background:new 0 0 512.05 512.05;" xml:space="preserve">
                    <path style="fill:#2196F3;" d="M256.025,0.05C117.67-2.678,3.184,107.038,0.025,245.383c0.361,70.423,31.544,137.157,85.333,182.613
                      v73.387c0,5.891,4.776,10.667,10.667,10.667c1.999,0,3.958-0.562,5.653-1.621l59.456-37.141
                      c30.292,11.586,62.459,17.494,94.891,17.429c138.355,2.728,252.841-106.988,256-245.333C508.866,107.038,394.38-2.678,256.025,0.05z
                      "/>
                    <path style="fill:#FAFAFA;" d="M424.558,174.983c-3.174-4.254-8.993-5.527-13.653-2.987l-110.933,60.48l-69.013-59.179
                    c-4.232-3.628-10.544-3.387-14.485,0.555l-128,128c-4.153,4.178-4.133,10.932,0.046,15.085c3.341,3.321,8.464,4.057,12.605,1.811
                    l110.933-60.48l69.077,59.2c4.232,3.628,10.544,3.387,14.485-0.555l128-128C427.35,185.148,427.75,179.215,424.558,174.983z"/>
                  </svg>
                </div>
                <p class="ml-1 font-weight-bold">会話を追加する</p>
                <p class="reactionListText">ユーザーが【はなす】コマンドを押したときに表示されるメッセージです。複数設定すると、押される度に順番に表示されます。最大5個設定できます。(140文字以内)</p>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11  mt-4 pb-0 border-top>
                <div class="svg_area">
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512.05 512.05" class="reaction_list_svg" style="enable-background:new 0 0 512.05 512.05;" xml:space="preserve">
                    <path style="fill:#2196F3;" d="M256.025,0.05C117.67-2.678,3.184,107.038,0.025,245.383c0.361,70.423,31.544,137.157,85.333,182.613
                      v73.387c0,5.891,4.776,10.667,10.667,10.667c1.999,0,3.958-0.562,5.653-1.621l59.456-37.141
                      c30.292,11.586,62.459,17.494,94.891,17.429c138.355,2.728,252.841-106.988,256-245.333C508.866,107.038,394.38-2.678,256.025,0.05z
                      "/>
                    <path style="fill:#FAFAFA;" d="M424.558,174.983c-3.174-4.254-8.993-5.527-13.653-2.987l-110.933,60.48l-69.013-59.179
                    c-4.232-3.628-10.544-3.387-14.485,0.555l-128,128c-4.153,4.178-4.133,10.932,0.046,15.085c3.341,3.321,8.464,4.057,12.605,1.811
                    l110.933-60.48l69.077,59.2c4.232,3.628,10.544,3.387,14.485-0.555l128-128C427.35,185.148,427.75,179.215,424.558,174.983z"/>
                  </svg>
                </div>
                <p class="ml-1 font-weight-bold">リンクを追加する</p>
                <p class="font-weight-thin reactionListText">ユーザーが【しらべる】コマンドを押したときに表示されるリンクの一覧です。最大5個設定できます。</p>
              </v-flex>
            </v-layout>
            

            
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout v-if="talkPanel" row justify-center align-center mt-5>
        <v-flex d-flex sm8>
          <div>
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
                  <label class="ml-1 font-weight-bold">会話{{me.talks.length + index + 1}}</label>
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import GET_ME from '~/apollo/queries/getMe.gql'
import MyPageNav from '~/components/MyPageNav.vue'
import UPDATE_USER_TALKS_GQL from '~/apollo/mutations/updateUserTalks.gql'
import _ from 'lodash'

export default {
  middleware: 'authenticated',
  components: {
    MyPageNav
  },
  data() {
    return {
      me: {
      },
      snackbar:false,
      snackbar_color: 'success',
      snackbar_text:"",
      newTalks: [],
      delTalks: [],
      talkSentence1Rules: [
        v => !!v || '文章1は必須です',
      ],
      settingPanel: true,
      talkPanel: false,
      searchPanel: false,
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
    onVisibleTalkPanel (){
      this.settingPanel = !this.settingPanel;
      this.talkPanel = !this.talkPanel;
    },
    onResetPanel (){
      this.settingPanel = false;
      this.talkPanel = false;
      this.searchPanel = false;
    },
    onDeleteUserTalk(delId){
      this.me.talks = _.reject(this.me.talks, { 'id': delId});
      this.delTalks.push(delId);
    },
    onDeleteUserNewTalk(index){
      this.newTalks.splice(index, 1);
    },
    onCreateUserTalk(){
      if(this.me.talks.length+this.newTalks.length>=5) {
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text = '会話は5個までです'
        return ;
      }
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
      }).then((data) => { 
        this.me = data.data.updateUserTalks
        this.newTalks = []
        this.snackbar = true
        this.snackbar_color = 'success'
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
.reactionListText{
  color: #787c7b;
  font-size: 13px;
}
.border-top{
  border-top: 1px solid #f2f2f2;
}
.svg_area{
    text-align: center;
    margin-top: 0;
    margin-bottom: 8px;
}
.reaction_list_svg{
  width: 128px;
}
</style>