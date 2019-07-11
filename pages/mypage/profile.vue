<template>
  <div>
    <v-container grid-list-xl>
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
                  v-model="name"
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
                  v-model="title"
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
                  v-model="height"
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
                  v-model="weight"
                  outline
                  hide-details
                  placeholder="2kg"
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center>
              <v-flex xs11 d-flex pb-0>
                <label class="ml-1 font-weight-bold">ツイットモンスター</label>
              </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
              <v-flex xs11 d-flex>
                <v-textarea
                  outline
                  hide-details
                  :auto-grow="true"
                  placeholder="ほのぼのしてるツイットモンスター"
                  v-model="description">
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
            <p>{{description}}</p>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import getUsersGql from '~/apollo/queries/getUsers.gql'
import MyPageNav from '~/components/MyPageNav.vue'
import NuxtLogo from '~/components/NuxtLogo.vue'

export default {
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
      user: {
      },
      items: [
        { icon: 'apps', title: 'プロフィール', to: '/' },
        { icon: 'bubble_chart', title: 'はなす', to: '/create' }
      ],
    }
  },
  computed: {
    arrDescription () { 
      return this.description.split(/\n/);
    },
  },
  apollo: {
    // user: {
    //   query: getUsersGql,
    //   variables() {
    //     return {
    //       userId: 8,
    //     };
    //   },
    // }
  },
  methods: {
    commandTalk (){
      this.name = "ミツダマ"
      this.title = "えんじにあニセモン"
      this.height = "1.7mm"
      this.weight = "りんご3こぶん"
      this.description = `ふくおかに せいそくする うぇぶの ぷろぐらまー。
ぶらっくな かいしゃから すぐいなくなる。2びょう
かんに 1000もじの コードを かくことができる。`;
      // console.log( this.description.split(/\n/) );
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