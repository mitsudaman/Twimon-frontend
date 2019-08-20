<template>
  <div>
    <div style="font-family: PixelMplus;">.</div>
    <v-stage ref="stage" :config="stageSize" style="font-family: PixelMplus;">
      <v-layer ref="layer">
        <v-image :config="{
          x: 20,
          y: 10,
          image: image
        }"/>
        <v-text ref="text" :config="{
          x: 180,
          y: 30,
          fontFamily: 'PixelMplus',
          fontSize: 14,
          text: text1,
          fill: 'black'
        }" />
        <v-text ref="text" :config="{
          x: 180,
          y: 70,
          fontFamily: 'PixelMplus',
          fontSize: 14,
          text: text2,
          fill: 'black'
        }" />
        <v-text ref="text" :config="{
          x: 180,
          y: 110,
          fontFamily: 'PixelMplus',
          fontSize: 14,
          text: text3,
          fill: 'black'
        }" />
        <v-text ref="text" :config="{
          x: 180,
          y: 150,
          fontFamily: 'PixelMplus',
          fontSize: 14,
          text: text4,
          fill: 'black'
        }" />
      </v-layer>
    </v-stage>
    <v-flex xs12 sm8 md6>
      <v-btn
        :block=true
        :large=true
        @click="commandTalk"
        color="grey darken-3 white--text">
        <span><i class="far fa-comment-dots"></i> はなす</span>
      </v-btn>
    </v-flex>
    <div id="app">
      <input type="file" v-on:change="onFileChange">
    </div>
    <v-text-field
      v-model="text1"
      outline
      placeholder="テキスト"
      single-line
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stageSize: {
        width: 400,
        height: 200,
        fontFamily: 'PixelMplus',
      },
      text1: 'ミツダマ',
      text2: 'えんじにあニセモン',
      text3: 'たかさ 1.7mm',
      text4: 'おもさ りんご3こぶん',
      image: null,
      uploadedImage: '',
    }
  },
  created() {
    // this.createCanvasImage("https://konvajs.org/assets/yoda.jpg")
  },
  mounted(){
    this.text1 = "マウント"
  },
  methods: {
    commandTalk (){
      let canvas = document.getElementsByTagName("canvas")[0];;
      // let canvas = this.$refs["stage"];
      console.log(canvas)
      let link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "test.png";
      link.click();
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    // アップロードした画像を表示
    createImage(file) {
      // 画像ファイル以外は処理を止める
      if(!file.type.match('image.*')) {
          alert('画像を選択してください');
          return;
      }
      // FileReaderオブジェクトを使ってファイル読み込み
      var reader = new FileReader();
      // ファイル読み込みに成功したときの処理
      reader.onload = () => {
          // Canvas上に表示する
          var uploadImgSrc = reader.result;
          this.createCanvasImage(uploadImgSrc)
      }
      // ファイル読み込みを実行
      reader.readAsDataURL(file);
    },
    createCanvasImage(src){
      const image = new window.Image();
      image.crossOrigin = "Anonymous";
      image.src = src;
      image.onload = () => {
        var orgWidth  = image.width;  // 元の横幅を保存
        var orgHeight = image.height; // 元の高さを保存
        image.width = 150;  // 横幅を400pxにリサイズ
        image.height = orgHeight * (image.width / orgWidth)
        // set image only when it is loaded
        this.image = image;
      };
    }
  }
}
</script>

<style type="text/css">
@font-face {
	font-family: 'PixelMplus';
	src: url(~assets/font/PixelMplus10-Regular.ttf),local('PixelMplus10-Regular.ttf');
}
</style>