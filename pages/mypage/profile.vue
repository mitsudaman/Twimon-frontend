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
            @click="updateUser"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> 保存</span>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-center mt-3 text-xs-center>
        <v-flex sm5 class="profile ma-2">
          <v-layout row wrap justify-center>
            <v-flex xs6>
              <div>
                <v-img 
                v-if="imageRadioButton=='1'"
                class="image"
                src="https://konvajs.org/assets/yoda.jpg" 
                aspect-ratio="1"></v-img>
                <v-img
                class="image"
                v-if="imageRadioButton=='2'"
                v-show="uploadedImage" 
                :src="uploadedImage"
                aspect-ratio="1"></v-img>
              </div>
              <div text-center>
                No.???
              </div>
            </v-flex>
            <v-flex xs6 text-lef text-center
            :class="{'mt-0': $vuetify.breakpoint.smAndDown, 'mt-4': $vuetify.breakpoint.lgAndUp}">
              <div class="pl-2 text-xs-left">
                <p>{{ name }}</p>
                <p>{{ title }}</p>
                <p>たかさ {{ height }}</p>
                <p>おもさ {{ weight }}</p>
              </div>
            </v-flex>
          </v-layout>
          <hr style="border: 1px solid #000;">
          <div class="mt-3">
            <p>{{description}}</p>{{me}}
            <!-- {{this.$store.state.twimonToken}} -->
          </div>
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
      this.me.name = "ミツダマ"
      this.me.title = "えんじにあニセモン"
      this.me.feature1_content = "1.7mm"
      this.me.feature2_content = "りんご3こぶん"
      this.me.description = `ふくおかに せいそくする うぇぶの ぷろぐらまー。
ぶらっくな かいしゃから すぐいなくなる。2びょう
かんに 1000もじの コードを かくことができる。`;
    },
    updateUser (){
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
            sns_img_use_flg: true
          }
        },
      }).then(() => { 
        this.snackbar = true
        this.snackbar_text ="プロフィールを変更しました"
      }).catch(() => {
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text ="プロフィールを変更できませんでした"
    });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      // 画像ファイル以外は処理を止める
      if(!file.type.match('image.*')) {
          alert('画像を選択してください');
          return;
      }
      let reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
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
</style>