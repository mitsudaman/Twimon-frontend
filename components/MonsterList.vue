<template>
  <v-row>
    <v-col cols="3" v-for="user in users" v-bind:key="user.id">
      <v-card  :hover="true" class="rounded-card"
        :to="'/read/' + user.id">
          <v-img v-bind:src="user.sns_img_url" aspect-ratio="1"></v-img>
        </v-card>
        <p class="mb-0 mt-2 nameText text-truncate ">{{ user.name }}</p>
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
