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
        <v-flex sm8>
          <v-card class="rounded-card pb-5">
            <v-layout justify-center align-center>
              <v-flex xs11  mt-4 pb-0>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512.05 512.05" style="enable-background:new 0 0 512.05 512.05;" xml:space="preserve">
                  <path style="fill:#2196F3;" d="M256.025,0.05C117.67-2.678,3.184,107.038,0.025,245.383c0.361,70.423,31.544,137.157,85.333,182.613
                    v73.387c0,5.891,4.776,10.667,10.667,10.667c1.999,0,3.958-0.562,5.653-1.621l59.456-37.141
                    c30.292,11.586,62.459,17.494,94.891,17.429c138.355,2.728,252.841-106.988,256-245.333C508.866,107.038,394.38-2.678,256.025,0.05z
                    "/>
                  <path style="fill:#FAFAFA;" d="M424.558,174.983c-3.174-4.254-8.993-5.527-13.653-2.987l-110.933,60.48l-69.013-59.179
                  c-4.232-3.628-10.544-3.387-14.485,0.555l-128,128c-4.153,4.178-4.133,10.932,0.046,15.085c3.341,3.321,8.464,4.057,12.605,1.811
                  l110.933-60.48l69.077,59.2c4.232,3.628,10.544,3.387,14.485-0.555l128-128C427.35,185.148,427.75,179.215,424.558,174.983z"/>
                </svg>
                <p class="ml-1 font-weight-bold">会話を追加する</p>
                <p class="font-weight-thin reactionList_text">ユーザーが【はなす】コマンドを押したときに表示されるメッセージです。複数設定すると、押される度に順番に表示されます。最大5個設定できます。(140文字以内)</p>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11  mt-4 pb-0 border-top>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512.05 512.05" style="enable-background:new 0 0 512.05 512.05;" xml:space="preserve">
                  <path style="fill:#2196F3;" d="M256.025,0.05C117.67-2.678,3.184,107.038,0.025,245.383c0.361,70.423,31.544,137.157,85.333,182.613
                    v73.387c0,5.891,4.776,10.667,10.667,10.667c1.999,0,3.958-0.562,5.653-1.621l59.456-37.141
                    c30.292,11.586,62.459,17.494,94.891,17.429c138.355,2.728,252.841-106.988,256-245.333C508.866,107.038,394.38-2.678,256.025,0.05z
                    "/>
                  <path style="fill:#FAFAFA;" d="M424.558,174.983c-3.174-4.254-8.993-5.527-13.653-2.987l-110.933,60.48l-69.013-59.179
                  c-4.232-3.628-10.544-3.387-14.485,0.555l-128,128c-4.153,4.178-4.133,10.932,0.046,15.085c3.341,3.321,8.464,4.057,12.605,1.811
                  l110.933-60.48l69.077,59.2c4.232,3.628,10.544,3.387,14.485-0.555l128-128C427.35,185.148,427.75,179.215,424.558,174.983z"/>
                </svg>
                <p class="ml-1 font-weight-bold">リンクを追加する</p>
                <p class="font-weight-thin reactionList_text">ユーザーが【しらべる】コマンドを押したときに表示されるリンクの一覧です。最大5個設定できます。</p>
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
            @click="onUpdateUser"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> 保存</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import GET_ME from '~/apollo/queries/getMe.gql'
import MyPageNav from '~/components/MyPageNav.vue'
import NuxtLogo from '~/components/NuxtLogo.vue'
import UPDATE_USER_PROF_GQL from '~/apollo/mutations/updateUserProf.gql'
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
      snackbar:false,
      snackbar_color: 'success',
      snackbar_text:"",
      test_file:""
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
    },
  }
}
</script>
<style type="text/css">
.reactionList_text{
  color: #787c7b;
  font-size: 13px;
}
.border-top{
  border-top: 1px solid #f2f2f2;
}
</style>