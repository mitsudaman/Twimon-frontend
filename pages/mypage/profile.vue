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
    </v-container>
  </div>
</template>

<script>
import GET_ME from '~/apollo/queries/getMe.gql'
import MyPageNav from '~/components/MyPageNav.vue'
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
  }
}
</script>
<style type="text/css">
</style>