<template>
      <v-card class="rounded-card">
        <v-row>
          <v-col>
            <div class="headline mt-3">アカウント設定</div> 
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col class="mypage_link">
            <router-link class="font-weight-bold mr-3" to="profile">プロフィール</router-link> 
            <router-link class="font-weight-bold" to="reaction">リアクション</router-link>
          </v-col>
        </v-row>
      </v-card>
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
