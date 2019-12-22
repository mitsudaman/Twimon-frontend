<template>
  <v-row>
    <v-col 
      cols="12" 
      md="4" 
      v-for="user in users" 
      v-bind:key="user.id"
      class="pt-0 pt-md-3">
      <v-card  
        :hover="true"
        class="mx-auto text-left"
        :to="'/read/' + user.id" flat
            :style="{border: 'solid 2px' + $vuetify.theme.themes.light.background + '!important' }"
      >
       <v-row no-gutters>
         <v-col cols="4" md="12" class="pa-1 pa-md-0">
            <v-img
            v-bind:src="user.sns_img_url" 
            aspect-ratio="1">
            </v-img>
         </v-col>
         <v-col cols="8" md="12">
          <v-card-subtitle class="pt-2 pb-0 subtitle-1">
              {{ user.serial_number | serialNumFormatter }}
          </v-card-subtitle>
          <v-card-text>
            <p class="mb-0 subtitle-1 font-weight-black text-truncate ">{{ user.name }}</p>
          </v-card-text>
          <template>
            <div class="text-center">
              <v-row
                align="center"
                justify="center">
                <v-col cols="5">
                  <v-card v-if="user.type1" outlined :color="user.type1 | getTypeColor" class="white--text caption font-weight-bold type_area"> {{user.type1}} </v-card>
                </v-col>
                <v-col cols="5">
                  <v-card v-if="user.type1" outlined :color="user.type2 | getTypeColor" class="white--text caption font-weight-bold type_area"> 
                    {{ user.type2 }}
                     </v-card>
                </v-col>
              </v-row>
            </div>
          </template>
         </v-col>
       </v-row>
      </v-card>
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
  white-space: nowrap;
}
.type_area span{
  text-align: center !important;

}
</style>
