<template>
  <v-container fluid fill-height text-center>
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <v-row>
          <v-col v-if="likeUsers && likeUsers.length==0">
            <p class="mb-5 title">お気に入りのモンスターが登録されていません！</p>
          </v-col>
          <v-col cols="3" v-for="user in likeUsers" v-bind:key="user.id">
            <v-card  :hover="true" class="rounded-card"
              :to="'/read/' + user.id">
                <v-img v-bind:src="user.sns_img_url" aspect-ratio="1"></v-img>
              </v-card>
              <p class="mb-0 mt-2 nameText text-truncate ">{{ user.name }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-pagination
              v-model="page"
              :length="this.lastPage"
              circle
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GET_LIKE_USERS_GQL from '~/apollo/queries/getLikeUsers.gql'
import _ from 'lodash'

export default {
  middleware: 'authenticated',
  transition (to, from) {
    if (from && from.name === 'read-id') return 'index'
  },
  data () {
    return {
      page: 1,
      lastPage: 0
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
    likeUsers: {
      query: GET_LIKE_USERS_GQL,
      variables () {
        return {
          perPage: 12,
          page: this.page
        }
      },
      update (data) {
        this.lastPage = data.getLikeUsers.paginatorInfo.lastPage
        return data.getLikeUsers.likeUsers
      }
    }
  },
  methods: {
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
.like_panel_red {
  color:#ea3f60
}
.nameText{
  font-size: 11px;
}
</style>