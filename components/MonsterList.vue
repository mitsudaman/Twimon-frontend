<template>
  <v-row>
    <v-col cols="12" md="4" v-for="user in users" v-bind:key="user.id">
      <v-card  
        :hover="true"
        class="rounded-card mx-auto text-left"
        :to="'/read/' + user.id"
        max-width="400"
      >
        <v-img
        v-bind:src="user.sns_img_url" 
        aspect-ratio="1"
        class="border-bottom">
        </v-img>
        <v-divider></v-divider>
        <v-card-subtitle class="pt-2 pb-0 subtitle-1">
          <template
            v-if="String(user.serial_number).length<4"
            >No.{{(("000") + user.serial_number ).substr(-3)}}</template>
            <template
            v-else
            >No.{{user.serial_number}}</template>
        </v-card-subtitle>

        <v-card-text>
          <p class="mb-0 subtitle-1 font-weight-black text-truncate ">{{ user.name }}</p>
        </v-card-text>
        <template>
          <div class="text-center">
            <!-- <v-card class="type_area"> くさ </v-card>
            <v-card class="type_area"> どく </v-card> -->


        <span 
         class="type_area border">くさ</span>
        <span 
         class="type_area">くさ</span>
        <!-- <v-chip 
        label 
        class="type_area text-center"
        text-color="white">くさ</v-chip>
        <v-chip 
        label 
        class="type_area"
        text-color="white">どく</v-chip> -->



            <!-- <v-row >
              <v-col cols="6">
                <v-card
                  class="text-center"
                  label
                  text-color="white"
                >
                  くさ
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card
                  class="text-center"
                  label
                  text-color="white"
                >
                  くさ
                </v-card>
              </v-col>
            </v-row> -->
          </div>
        </template>
        <!-- <v-card-actions>
          <v-btn
            color="orange"
            text
          >
            Share
          </v-btn>

          <v-btn
            color="orange"
            text
          >
            Explore
          </v-btn>
        </v-card-actions> -->
      </v-card>
      <!-- <v-card  :hover="true" class="rounded-card"
        :to="'/read/' + user.id">
          <v-img v-bind:src="user.sns_img_url" aspect-ratio="1"></v-img>
        </v-card>
        <p class="mb-0 mt-2 nameText text-truncate ">{{ user.name }}</p> -->
    </v-col>
  </v-row>
</template>

<script>
import MonsterList from '~/components/MonsterList.vue'
import GET_LIKE_USERS_GQL from '~/apollo/queries/getLikeUsers.gql'
import _ from 'lodash'

export default {
  props: {
    users: null
  },
  data () {
    return {
      page: 1,
      lastPage: 0
    }
  },
}
</script>
<style type="text/css">
.type_area {
  width: 60px !important;
  height: 26px !important;
}
.type_area span{
  text-align: center !important;
}
</style>
