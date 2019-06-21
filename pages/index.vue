<template>
  <div>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="user in users" v-bind:key="user.id" xs12 sm3>
          <v-card  :hover="true"  class="rounded-card"
          :href="'/read?n=' + user.id">
            <!-- <v-img
              v-bind:src="require('~/assets/img/mitsudama.png')"
            ></v-img> -->
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            ></v-img>
            <v-card-title primary-title>
              <h3 class="headline text-truncate mb-0">{{ user.name }}</h3>
            </v-card-title>
            <div class="text-xs-left pl-4 pb-3">
              <div class="text-truncate"> {{ user.feature1 }} </div>
              <div class="text-truncate"> {{ user.feature1_content }} </div>
              <div class="text-truncate mt-2"> {{ user.feature2 }} </div>
              <div class="text-truncate"> {{ user.feature2_content }} </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout justify-center align-center>
        <v-flex xs4>
          <v-btn
            :block=true
            :large=true
            @click="commandTalk"
            color="grey darken-3 white--text">
            <span><i class="far fa-comment-dots"></i> 追加</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import GET_USERS_GQL from '~/apollo/queries/getUsers.gql'
import CREATE_USER_GQL from '~/apollo/mutations/createUser.gql'

export default {
  data() {
    return {
      name: "",
      title: "",
      height: "",
      weight: "",
      user: {
      }
    }
  },
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.xs) binding.column = true
      return binding
    }
  },
  apollo: {
    users: {
      query: GET_USERS_GQL,
      update(data){
        return data.users.data
      }
    }
  },
  methods: {
    commandTalk (){
      console.log("aaaaaaaaa")
      this.$apollo.mutate({
        mutation: CREATE_USER_GQL,
        variables: {
          // name: this.customer.name,
          // gender: this.customer.gender,
        }
      })
    },
  }
}
</script>
<style type="text/css">
.rounded-card{
  border-radius:20px;
  /* border: solid 10px #000; */
}
</style>