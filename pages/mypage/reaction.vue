<template>
  <div>
    <v-container grid-list-xl class="test">
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbar_color"
        :timeout=3000>
        <span class="snackbar_text">{{ snackbar_text }}</span>
      </v-snackbar>
      <my-page-nav></my-page-nav>
      <v-card class="rounded-card pb-5">
        <v-layout v-if="settingPanel"
        row justify-center align-center mt-5 px-5>
          <v-flex>
            <v-layout row wrap>
              <v-flex sm3 xs11  mt-4 pb-0  align-center>
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
              </v-flex>
              <v-flex sm9 xs12  mt-4 pb-0  align-center>
                <div class="reaction_list_title">
                  会話を追加する
                  <div class="reaction_list_edit" @click="onVisibleTalkPanel">
                    編集
                  </div>
                </div>
                <p class="reaction_list_text">ユーザーが【はなす】コマンドを押したときに表示されるメッセージです。複数設定すると、押される度に順番に表示されます。最大5個設定できます。(140文字以内)</p>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center align-center mt-2 border-top>
              <v-flex sm3 xs11  mt-4 pb-0>
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
              </v-flex>
              <v-flex sm9 xs11  mt-4 pb-0>
                <div class="reaction_list_title">
                  リンクを追加する
                  <div class="reaction_list_edit" @click="onVisibleSearchPanel">
                    編集
                  </div>
                </div>
                <p class="font-weight-thin reaction_list_text">ユーザーが【しらべる】コマンドを押したときに表示されるリンクの一覧です。リンク名とURLを最大5個設定できます。</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout v-if="talkPanel" row wrap justify-center align-center mt-5 
        :class="{'px-1': $vuetify.breakpoint.xsOnly,'px-5': $vuetify.breakpoint.smAndUp}">
          <v-flex xs12>
            <div>
              <div
                v-for="(talk,index) in me.talks"
                v-bind:key="talk.id"
                class="mt-5">
                <v-layout justify-space-between align-center>
                  <v-flex xs8 pb-0>
                    <label class="ml-1 font-weight-bold headline">会話{{index+1}}</label>
                  </v-flex>
                  <v-flex v-if="me.talks.length + newTalks.length >1" xs4 pb-0 text-xs-right>
                    <button class="red--text" @click="onDeleteUserTalk(talk.id)">
                      <i class="fas fa-times"></i> 削除
                    </button>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-center align-center>
                  <v-flex>
                    <v-textarea
                      v-model="talk.sentence1"
                      outline
                      hide-details
                      placeholder="こんにちわ"
                      :error="getLen(talk.sentence1) > 50">
                    </v-textarea>
                    <div v-bind:class="{'red--text': getLen(talk.sentence1) > 50}">
                      <v-layout row wrap justify-center align-center px-2>
                        <v-flex xs9>
                          <small
                          v-if="getLen(talk.sentence1) > 50">50文字以下で入力してください</small>
                        </v-flex>
                        <v-flex xs3 class="text-xs-right">
                          <small>{{getLen(talk.sentence1)}} / 50</small>
                        </v-flex>
                      </v-layout>
                    </div>
                    <v-textarea
                      v-model="talk.sentence2"
                      outline
                      hide-details
                      class="mt-3"
                      :error="getLen(talk.sentence2) > 50">
                    </v-textarea>
                    <div v-bind:class="{'red--text': getLen(talk.sentence2) > 50}">
                      <v-layout row wrap justify-center align-center px-2>
                        <v-flex xs9>
                          <small
                          v-if="getLen(talk.sentence2) > 50">50文字以下で入力してください</small>
                        </v-flex>
                        <v-flex xs3 class="text-xs-right">
                          <small>{{getLen(talk.sentence2)}} / 50</small>
                        </v-flex>
                      </v-layout>
                    </div>
                    <v-textarea
                      v-model="talk.sentence3"
                      outline
                      hide-details
                      class="mt-3"
                      :error="getLen(talk.sentence3) > 50">
                    </v-textarea>
                    <div v-bind:class="{'red--text': getLen(talk.sentence3) > 50}">
                      <v-layout row wrap justify-center align-center px-2>
                        <v-flex xs9>
                          <small
                          v-if="getLen(talk.sentence3) > 50">50文字以下で入力してください</small>
                        </v-flex>
                        <v-flex xs3 class="text-xs-right">
                          <small>{{getLen(talk.sentence3)}} / 50</small>
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
              <div
                v-for="(talk,index) in newTalks"
                v-bind:key="talk.id"
                class="mt-5">
                <v-layout justify-space-between align-center>
                  <v-flex xs6 pb-0>
                    <label class="ml-1 font-weight-bold headline">会話{{me.talks.length + index + 1}}</label>
                  </v-flex>
                  <v-flex v-if="me.talks.length + newTalks.length >1" xs3 pb-0 text-xs-right>
                    <button class="red--text" @click="onDeleteUserNewTalk(index)">
                      <i class="fas fa-times"></i> 削除
                    </button>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-center align-center>
                  <v-flex>
                    <v-textarea
                      v-model="talk.sentence1"
                      outline
                      hide-details
                      placeholder="こんにちわ"
                      :error="getLen(talk.sentence1) > 50">
                    </v-textarea>
                    <div v-bind:class="{'red--text': getLen(talk.sentence1) > 50}">
                      <v-layout row wrap justify-center align-center px-2>
                        <v-flex xs9>
                          <small
                          v-if="getLen(talk.sentence1) > 50">50文字以下で入力してください</small>
                        </v-flex>
                        <v-flex xs3 class="text-xs-right">
                          <small>{{getLen(talk.sentence1)}} / 50</small>
                        </v-flex>
                      </v-layout>
                    </div>
                    <v-textarea
                      v-model="talk.sentence2"
                      outline
                      hide-details
                      class="mt-3"
                      :error="getLen(talk.sentence2) > 50">
                    </v-textarea>
                    <div v-bind:class="{'red--text': getLen(talk.sentence2) > 50}">
                      <v-layout row wrap justify-center align-center px-2>
                        <v-flex xs9>
                          <small
                          v-if="getLen(talk.sentence2) > 50">50文字以下で入力してください</small>
                        </v-flex>
                        <v-flex xs3 class="text-xs-right">
                          <small>{{getLen(talk.sentence2)}} / 50</small>
                        </v-flex>
                      </v-layout>
                    </div>
                    <v-textarea
                      v-model="talk.sentence3"
                      outline
                      hide-details
                      class="mt-3"
                      :error="getLen(talk.sentence3) > 50">
                    </v-textarea>
                    <div v-bind:class="{'red--text': getLen(talk.sentence3) > 50}">
                      <v-layout row wrap justify-center align-center px-2>
                        <v-flex xs9>
                          <small
                          v-if="getLen(talk.sentence3) > 50">50文字以下で入力してください</small>
                        </v-flex>
                        <v-flex xs3 class="text-xs-right">
                          <small>{{getLen(talk.sentence3)}} / 50</small>
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </v-flex>
          <v-flex>
            <v-btn
              :block=true
              :large=true
              :disabled="this.me.talks.length + this.newTalks.length >= 5"
              @click="onCreateUserTalk"
              color="grey darken-3 white--text">
              <span><i class="far fa-comment-dots"></i> 追加</span>
            </v-btn>
            <v-btn
              :block=true
              :large=true
              @click="onUpdateUserTalks"
              :disabled="!isTalkUpdatable"
              color="grey darken-3 white--text">
              <span><i class="far fa-comment-dots"></i> 会話保存</span>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout v-if="searchPanel" row wrap justify-center align-center mt-5 
        :class="{'px-1': $vuetify.breakpoint.xsOnly,'px-5': $vuetify.breakpoint.smAndUp}">
          <v-flex xs12>
            <div>
              <v-layout row wrap justify-center align-center>
                <v-flex xs11 mt-4 pb-0>
                  <label class="ml-1 font-weight-bold">{{me.url1_name}}</label>
                </v-flex>
                <v-flex xs11>
                  <v-text-field
                    v-model="me.url1"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12>
            <div>
              <v-layout row wrap justify-center align-center>
                <v-flex xs11 mt-4 pb-0>
                  <label class="ml-1 font-weight-bold">{{me.url2_name}}</label>
                </v-flex>
                <v-flex xs11>
                  <v-text-field
                    v-model="me.url2"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12>
            <div>
              <v-layout row wrap justify-center align-center>
                <v-flex xs11 mt-4 pb-0>
                  <label class="ml-1 font-weight-bold">{{me.url3_name}}</label>
                </v-flex>
                <v-flex xs11>
                  <v-text-field
                    v-model="me.url3"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12>
            <div>
              <v-layout row wrap justify-center align-center>
                <v-flex xs11 mt-4 pb-0>
                  <label class="ml-1 font-weight-bold">{{me.url4_name}}</label>
                </v-flex>
                <v-flex xs11>
                  <v-text-field
                    v-model="me.url4"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12>
            <div>
              <v-layout row wrap justify-center align-center>
                <v-flex xs11 mt-4 pb-0>
                  <label class="ml-1 font-weight-bold">{{me.url5_name}}</label>
                </v-flex>
                <v-flex xs11>
                  <v-text-field
                    v-model="me.url5"
                    outline
                    hide-details
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex>
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
              :loading="isLoadingUpdateUserDetailBtn"
              @click="onUpdateUserDetail"
              color="grey darken-3 white--text">
              <span><i class="far fa-comment-dots"></i> リンク保存</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import GET_ME from '~/apollo/queries/getMe.gql'
import MyPageNav from '~/components/MyPageNav.vue'
import UPDATE_USER_TALKS_GQL from '~/apollo/mutations/updateUserTalks.gql'
import UPDATE_USER_DETAIL_GQL from '~/apollo/mutations/updateUserDetail.gql'
import _ from 'lodash'

export default {
  middleware: 'authenticated',
  components: {
    MyPageNav
  },
  data () {
    return {
      me: {
      },
      snackbar: false,
      snackbar_color: 'success',
      snackbar_text: '',
      newTalks: [],
      delTalks: [],
      settingPanel: true,
      talkPanel: false,
      searchPanel: false,
      isLoadingUpdateUserDetailBtn: false
    }
  },
  apollo: {
    me: {
      query: GET_ME,
      update (data) {
        return _.cloneDeep(data.me)
      }
    }
  },
  computed: {
    isTalkUpdatable () {
      let updatableFlg = true
      _.forEach(this.me.talks, (n) => {
        if (this.getLen(n.sentence1) > 50 || this.getLen(n.sentence2) > 50 || this.getLen(n.sentence3) > 50) updatableFlg = false
      })
      _.forEach(this.newTalks, (n) => {
        if (this.getLen(n.sentence1) > 50 || this.getLen(n.sentence2) > 50 || this.getLen(n.sentence3) > 50) updatableFlg = false
      })
      return updatableFlg
    }
  },
  methods: {
    onVisibleTalkPanel () {
      this.onResetPanel()
      this.talkPanel = true
      if (this.me.talks.length + this.newTalks.length === 0) {
        this.newTalks.push({
          sentence1: '',
          sentence2: '',
          sentence3: ''
        })
      }
    },
    onVisibleSearchPanel () {
      this.onResetPanel()
      this.searchPanel = true
    },
    onResetPanel () {
      this.settingPanel = false
      this.talkPanel = false
      this.searchPanel = false
    },
    onDeleteUserTalk (delId) {
      this.me.talks = _.reject(this.me.talks, { 'id': delId })
      this.delTalks.push(delId)
    },
    onDeleteUserNewTalk (index) {
      this.newTalks.splice(index, 1)
    },
    onCreateUserTalk () {
      if (this.me.talks.length + this.newTalks.length >= 5) {
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text = '会話は5個までです'
        return
      }
      this.newTalks.push({
        sentence1: '',
        sentence2: '',
        sentence3: ''
      })
    },
    onUpdateUserTalks () {
      let updateTalks = _.map(this.me.talks, (n) => {
        return _.pick(n, ['id', 'sentence1', 'sentence2', 'sentence3'])
      })
      // ユーザー会話情報アップデート
      this.$apollo.mutate({
        mutation: UPDATE_USER_TALKS_GQL,
        variables: {
          UpdateUserTalksInput: {
            talks: {
              create: this.newTalks,
              update: updateTalks,
              delete: this.delTalks
            }
          }
        }
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
      })
    },
    onUpdateUserDetail () {
      this.isLoadingUpdateUserDetailBtn = true
      // ユーザー会話情報アップデート
      this.$apollo.mutate({
        mutation: UPDATE_USER_DETAIL_GQL,
        variables: {
          UpdateUserDetailInput: {
            url1: this.me.url1,
            url2: this.me.url2,
            url3: this.me.url3,
            url4: this.me.url4,
            url5: this.me.url5
          }
        }
      }).then((data) => {
        this.me = data.data.updateUserDetail
        this.isLoadingUpdateUserDetailBtn = false
        this.newTalks = []
        this.snackbar = true
        this.snackbar_color = 'success'
        this.snackbar_text = 'リンクを更新しました'
      }).catch(() => {
        this.isLoadingUpdateUserDetailBtn = false
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text = 'リンクを更新できませんでした'
      })
    },
    getLen (str) {
      if (str == null || str === '') return 0
      var result = 0
      for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i)
        if ((chr >= 0x00 && chr < 0x81) ||
          (chr === 0xf8f0) ||
          (chr >= 0xff61 && chr < 0xffa0) ||
          (chr >= 0xf8f1 && chr < 0xf8f4)) {
          result += 0.5
        } else {
          result += 1
        }
      }
      return result
    }
  }
}
</script>
<style type="text/css">
.reaction_list_text{
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
  width: 104px;
}
.reaction_list_title {
    font-weight: bold;
    font-size: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 8px;
}
.reaction_list_edit {
    font-size: 14px;
    line-height: 1.5;
    margin-left: 16px;
    color: #2CB696;
    white-space: nowrap;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}
</style>