<template>
  <div>
    <v-container grid-list-xl>
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbarColor"
        :timeout=3000
      >
        <span class="snackbarText">{{ snackbarText }}</span>
      </v-snackbar>
      <my-page-nav></my-page-nav>{{isUpdatable}}
      <v-layout row justify-center align-center mt-5>
        <v-flex>
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
                  :rules="[rules.length(20)]"
                  counter="20"
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
                  :rules="[rules.length(20)]"
                  counter="20"
                  placeholder="ほのぼのツイモン"
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
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <v-btn
            :block=true
            :large=true
            :disabled="!isUpdatable"
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
      rules: {
        length: len => v => (v || '').length <= len || `${len}文字以下で入力してください `,
      },
      me: {
      },
      snackbar:false,
      snackbarColor: 'success',
      snackbarText:"",
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
  computed: {
    isUpdatable(){
      return String(this.me.name).length <= 20 && String(this.me.title).length <= 20
    }
  },
  methods: {
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
          this.snackbarText = 'プロフィールを更新しました'
        }).catch(() => {
          this.snackbar = true
          this.snackbarColor = 'error'
          this.snackbarText = 'プロフィールを更新できませんでした'
        });
    },
  }
}
</script>
<style type="text/css">
</style>