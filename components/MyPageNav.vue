<template>
  <v-layout text-xs-center row wrap justify-center>
    <v-flex sm8>
      <v-card class="rounded-card">
        <v-layout row justify-center align-center>
          <v-flex xs11 d-flex>
            <div class="headline mt-3">アカウント設定</div> 
          </v-flex>
        </v-layout>
        <v-layout row justify-center align-center>
          <v-flex class="mypage_link" mt-3 px-5 xs11 d-flex>
            <router-link class="font-weight-bold" to="profile">プロフィール</router-link> 
            <router-link class="font-weight-bold" to="reaction">リアクション</router-link>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
</style>
