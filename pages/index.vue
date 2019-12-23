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
  :class="{'back-ground-color-sm-and-down': $vuetify.breakpoint.smAndDown}"> 
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <!-- <monster-list :users="users"/> -->
        {{users}}
        <v-row
          align="center"
          justify="center"
          class="py-3">
          <v-col cols="10" class="text-center">
            <v-btn
              rounded
              block
              @click="onSearchUsers"
              color="primary">
              <span>こうしん</span>
            </v-btn>
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
      lastPage: 0,
      type1:'',
      type2:''
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
          perPage:12,
          page: this.page,
          type1:this.type1,
          type2:this.type2
        }
      },
      update (data) {
        this.lastPage = data.getUsers.paginatorInfo.lastPage
        return data.getUsers.users
      }
    }
  },
  methods: {
    onSearchUsers () {
      this.type1="みず"
    },
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