<template>
  <v-layout text-xs-center row wrap justify-center>
    <v-flex>
      <v-card class="rounded-card">
        <v-layout row align-center>
          <v-flex d-flex justify-center>
            <div class="headline mt-3">アカウント設定</div> 
          </v-flex>
        </v-layout>
        <v-layout row justify-center align-center>
          <v-flex class="mypage_link" mt-3 px-5 d-flex justify-center>
            <router-link class="font-weight-bold mr-3" to="profile">プロフィール</router-link> 
            <router-link class="font-weight-bold" to="reaction">リアクション</router-link>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
.mypage_link a {
  color: #787c7b!important;
  text-decoration: none ;
}
.mypage_link a.nuxt-link-active{
  color: #2CB696!important;
}
.mypage_link a:hover{
  color: #000000;
}
</style>
