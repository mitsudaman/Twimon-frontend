<template>
  <div>
    <v-container  fluid fill-height
  :class="{containerSmAndDown: $vuetify.breakpoint.smAndDown}">
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbarColor"
        :timeout=3000
      >
        <span class="snackbarText">{{ snackbarText }}</span>
      </v-snackbar>
      <v-row 
        align="center"
        justify="center"
        no-gutters
        class="text-center">
        <v-col>
          <my-page-nav></my-page-nav>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        no-gutters
        class="mt-5">
        <v-col>
          <v-card>
            <v-row
              align="center"
              justify="center">
              <v-col cols="11" class="mt-5 pb-0 ml-3">
                <label class="font-weight-bold">タイプ</label>
              </v-col>
              <v-col cols="11">
                <v-select
                  v-model="typeValue"
                  :items="types"
                  multiple
                  outlined
                  :error="typeValue.length > 2"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip :color="item | getTypeColor">
                      <span>{{ item }}</span>
                    </v-chip>
                  </template>
                </v-select>
                <small
                v-if="typeValue.length > 2"
                class="red--text">タイプは2つまでです</small>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center">
              <v-col cols="11" class="mt-5 pb-0 ml-3">
                <label class="font-weight-bold">ニックネーム<small class="red--text">*</small></label>
              </v-col>
              <v-col cols="11" class="pb-0">
                <v-text-field
                  v-model="me.name"
                  outlined
                  placeholder="ツイモン"
                  hide-details
                  single-line
                  :error="getLen(me.name) > 20 || getLen(me.name) == 0"
                ></v-text-field>
                  <v-row 
                    no-gutters
                    v-bind:class="{'red--text': getLen(me.name) > 20 || getLen(me.name) == 0}">
                    <v-col cols="9" class="pl-5">
                      <small
                      v-if="getLen(me.name) > 20">20文字以下で入力してください</small>
                      <small
                      v-if="getLen(me.name) == 0">入力してください</small>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      <small>{{getLen(me.name)}} / 20</small>
                    </v-col>
                  </v-row>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center">
              <v-col cols="11" class="pb-0 ml-3">
                <label class="font-weight-bold">タイトル</label>
              </v-col>
              <v-col cols="11" class="pb-0">
                <v-text-field
                  v-model="me.title"
                  outlined
                  placeholder="ほのぼのツイモン"
                  hide-details
                  single-line
                  :error="getLen(me.title) > 20 || getLen(me.title) == 0"
                ></v-text-field>
                  <v-row 
                    no-gutters
                    v-bind:class="{'red--text': getLen(me.title) > 20 || getLen(me.title) == 0}">
                    <v-col cols="9" class="pl-5">
                      <small
                      v-if="getLen(me.title) > 20">20文字以下で入力してください</small>
                      <small
                      v-if="getLen(me.title) == 0">入力してください</small>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      <small>{{getLen(me.title)}} / 20</small>
                    </v-col>
                  </v-row>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center">
              <v-col cols="11" class="pb-0 ml-3">
                <label class="font-weight-bold">せつめい</label>
              </v-col>
              <v-col cols="11" class="pb-0">
                <v-text-field
                  v-model="me.description1"
                  outlined
                  placeholder=""
                  hide-details
                  single-line
                  :error="getLen(me.description1) > 25 || getLen(me.description1) == 0"
                ></v-text-field>
                  <v-row 
                    no-gutters
                    v-bind:class="{'red--text': getLen(me.description1) > 25 || getLen(me.description1) == 0}">
                    <v-col cols="9" class="pl-5">
                      <small
                      v-if="getLen(me.description1) > 25">25文字以下で入力してください</small>
                      <small
                      v-if="getLen(me.description1) == 0">入力してください</small>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      <small>{{getLen(me.description1)}} / 25</small>
                    </v-col>
                  </v-row>
              </v-col>
              <v-col cols="11" class="pb-0">
                <v-text-field
                  v-model="me.description2"
                  outlined
                  placeholder=""
                  hide-details
                  single-line
                  :error="getLen(me.description2) > 25 || getLen(me.description2) == 0"
                ></v-text-field>
                <v-row 
                  no-gutters
                  v-bind:class="{'red--text': getLen(me.description2) > 25 || getLen(me.description2) == 0}">
                  <v-col cols="9" class="pl-5">
                    <small
                    v-if="getLen(me.description2) > 25">25文字以下で入力してください</small>
                    <small
                    v-if="getLen(me.description2) == 0">入力してください</small>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <small>{{getLen(me.description2)}} / 25</small>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="11" class="pb-0">
                <v-text-field
                  v-model="me.description3"
                  outlined
                  placeholder=""
                  hide-details
                  single-line
                  :error="getLen(me.description3) > 25 || getLen(me.description3) == 0"
                ></v-text-field>
                  <v-row 
                    no-gutters
                    v-bind:class="{'red--text': getLen(me.description3) > 25 || getLen(me.description3) == 0}">
                    <v-col cols="9" class="pl-5">
                      <small
                      v-if="getLen(me.description3) > 25">25文字以下で入力してください</small>
                      <small
                      v-if="getLen(me.description3) == 0">入力してください</small>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      <small>{{getLen(me.description3)}} / 25</small>
                    </v-col>
                  </v-row>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center"
              class="py-3">
              <v-col cols="10" class="text-center">
                <v-btn
                  rounded
                  block
                  :disabled="!isUpdatable"
                  @click="onUpdateUser"
                  color="primary">
                  <span>こうしん</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
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
      snackbarText: '',
      types: [
        'でんき', 
        'ほのお', 
        'みず', 
        'くさ', 
        'はがね', 
        'どく'
      ],
      typeValue: [],
    }
  },
  apollo: {
    me: {
      query: GET_ME,
      update (data) {
        this.typeValue = []
        if(data.me.type1) this.typeValue.push(data.me.type1)
        if(data.me.type2) this.typeValue.push(data.me.type2)
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
              this.getLen(this.me.description3) <= 25 &&
              this.typeValue.length <= 2
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
      let type1 = this.typeValue[0]?this.typeValue[0]:null
      let type2 = this.typeValue[1]?this.typeValue[0]:null
      // ユーザー情報アップデート
      this.$apollo.mutate({
        mutation: UPDATE_USER_PROF_GQL,
        variables: {
          UpdateUserProfInput: {
            name: this.me.name,
            title: this.me.title,
            type1: type1,
            type2: type2,
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