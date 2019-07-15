<template>
  <div>

    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-2 font-weight-thin mb-3">ツイットモンスター(仮)</h1>
        <h4 class="subheading">Build your application today!</h4>
      </v-layout>
    </v-parallax>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="user in users" v-bind:key="user.id" xs12 sm3>
          <v-card  :hover="true" class="rounded-card-20"
          :to="'/read/' + user.id">
            <v-img v-bind:src="require('~/assets/img/gattyo/' + user.img_src)" aspect-ratio="1"></v-img>
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
      <v-layout row wrap>
        <v-flex>
          <div class="text-xs-center">
            <v-pagination
              v-model="page"
              :length="this.lastPage"
              circle
            ></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import GET_USERS_GQL from '~/apollo/queries/getUsers.gql'
// import CREATE_USER_GQL from '~/apollo/mutations/createUser.gql'

export default {
  data() {
    return {
      name: "",
      title: "",
      height: "",
      weight: "",
      user: {
      },
      page:1,
      users: null,
      lastPage:0
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
      variables() {
        return {
          page: this.page,
        };
      },
      update(data){
        this.lastPage= data.users.paginatorInfo.lastPage
        return data.users.data
      }
    }
  },
  methods: {
    commandTalk (){
      console.log("aaaaaaaaa")
      // this.$apollo.mutate({
      //   mutation: CREATE_USER_GQL,
      //   variables: {
      //     // name: this.customer.name,
      //     // gender: this.customer.gender,
      //   }
      // })
    },
  }
}
</script>
<style type="text/css">
.header{
  background-color:blue; 
  height:300px;
  font-size: 100px;
  font-family: 'PixelMplus';
  text-align: center;
  padding-top:60px;
}
</style>