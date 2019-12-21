<template>
  <!-- <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-4 title_text font-weight-thin mb-3">ツイットモンスター</h1>
    </v-layout>
  </v-parallax> -->
  <v-container fluid fill-height text-center
  :class="{containerSmAndDown: $vuetify.breakpoint.smAndDown}"> 
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <monster-list :users="users"/>
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
import MonsterList from '~/components/MonsterList.vue'
import GET_USERS_GQL from '~/apollo/queries/getUsers.gql'

export default {
  transition (to, from) {
    if (from && from.name === 'read-id') return 'index'
  },
  components: {
    MonsterList
  },
  data () {
    return {
      name: '',
      title: '',
      height: '',
      weight: '',
      user: {
      },
      page: 1,
      users: null,
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
    users: {
      query: GET_USERS_GQL,
      variables () {
        return {
          page: this.page
        }
      },
      update (data) {
        this.lastPage = data.users.paginatorInfo.lastPage
        return data.users.data
      }
    }
  },
  methods: {
  }
}
</script>
<style type="text/css">
.title_text{
  font-family: 'PixelMplus' !important;
  text-align: center;
  padding-top:60px;
}
.like_panel_red {
  color:#ea3f60
}
/* .nameText{
  font-size: 11px;
} */
</style>