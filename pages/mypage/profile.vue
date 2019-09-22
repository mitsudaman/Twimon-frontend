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
      <my-page-nav></my-page-nav>
      <v-layout row justify-center align-center mt-5>
        <v-flex>
          <v-card class="rounded-card">
            <v-layout row wrap justify-center align-center>
              <v-flex xs11 mt-4 pb-0>
                <label class="ml-1 font-weight-bold">ニックネーム<small class="red--text">*</small></label>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="me.name"
                  outline
                  placeholder="ツイモン"
                  hide-details
                  single-line
                  :error="getLen(me.name) > 20 || getLen(me.name) == 0"
                ></v-text-field>
                <div v-bind:class="{'red--text': getLen(me.name) > 20 || getLen(me.name) == 0}">
                  <v-layout row wrap justify-center align-center px-2>
                    <v-flex xs9>
                      <small
                      v-if="getLen(me.name) > 20">20文字以下で入力してください</small>
                      <small
                      v-if="getLen(me.name) == 0">入力してください</small>
                    </v-flex>
                    <v-flex xs3 class="text-xs-right">
                      <small>{{getLen(me.name)}} / 20</small>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center align-center>
              <v-flex xs11 pb-0>
                <label class="ml-1 font-weight-bold">タイトル</label>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="me.title"
                  outline
                  placeholder="ほのぼのツイモン"
                  hide-details
                  single-line
                  :error="getLen(me.title) > 20"
                ></v-text-field>
                <div v-bind:class="{'red--text': getLen(me.title) > 20}">
                  <v-layout row wrap justify-center align-center px-2>
                    <v-flex xs9>
                      <small
                      v-if="getLen(me.title) > 20">20文字以下で入力してください</small>
                    </v-flex>
                    <v-flex xs3 class="text-xs-right">
                      <small>{{getLen(me.title)}} / 20</small>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 pb-0>
                <label class="ml-1 font-weight-bold">せつめい</label>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center align-center pb-4>
              <v-flex xs11>
                <v-text-field
                  v-model="me.description1"
                  outline
                  placeholder=""
                  hide-details
                  single-line
                  :error="getLen(me.description1) > 25"
                ></v-text-field>
                <div v-bind:class="{'red--text': getLen(me.description1) > 25}">
                  <v-layout row wrap justify-center align-center px-2>
                    <v-flex xs9>
                      <small
                      v-if="getLen(me.description1) > 25">25文字以下で入力してください</small>
                    </v-flex>
                    <v-flex xs3 class="text-xs-right">
                      <small>{{getLen(me.description1)}} / 25</small>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="me.description2"
                  outline
                  hide-details
                  single-line
                  :error="getLen(me.description2) > 25"
                ></v-text-field>
                <div v-bind:class="{'red--text': getLen(me.description2) > 25}">
                  <v-layout row wrap justify-center align-center px-2>
                    <v-flex xs9>
                      <small
                      v-if="getLen(me.description2) > 25">25文字以下で入力してください</small>
                    </v-flex>
                    <v-flex xs3 class="text-xs-right">
                      <small>{{getLen(me.description2)}} / 25</small>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="me.description3"
                  outline
                  hide-details
                  single-line
                  :error="getLen(me.description3) > 25"
                ></v-text-field>
                <div v-bind:class="{'red--text': getLen(me.description3) > 25}">
                  <v-layout row wrap justify-center align-center px-2>
                    <v-flex xs9>
                      <small
                      v-if="getLen(me.description3) > 25">25文字以下で入力してください</small>
                    </v-flex>
                    <v-flex xs3 class="text-xs-right">
                      <small>{{getLen(me.description3)}} / 25</small>
                    </v-flex>
                  </v-layout>
                </div>
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
  data () {
    return {
      rules: {
        length: len => v => (v || '').length <= len || `${len}文字以下で入力してください `
      },
      me: {
      },
      snackbar: false,
      snackbarColor: 'success',
      snackbarText: ''
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
    isUpdatable () {
      return this.getLen(this.me.name) > 0 &&
              this.getLen(this.me.name) <= 20 &&
              this.getLen(this.me.title) <= 20 &&
              this.getLen(this.me.description1) <= 25 &&
              this.getLen(this.me.description2) <= 25 &&
              this.getLen(this.me.description3) <= 25
    }
  },
  methods: {
    onUpdateUser () {
      if (!this.isUpdatable) {
        this.snackbar = true
        this.snackbarColor = 'error'
        this.snackbarText = 'プロフィールを更新できませんでした'
        return
      }
      // ユーザー情報アップデート
      this.$apollo.mutate({
        mutation: UPDATE_USER_PROF_GQL,
        variables: {
          UpdateUserProfInput: {
            name: this.me.name,
            title: this.me.title,
            description1: this.me.description1,
            description2: this.me.description2,
            description3: this.me.description3
          }
        }
      }).then(() => {
        this.snackbar = true
        this.snackbarColor = 'success'
        this.snackbarText = 'プロフィールを更新しました'
      }).catch(() => {
        this.snackbar = true
        this.snackbarColor = 'error'
        this.snackbarText = 'プロフィールを更新できませんでした'
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
</style>