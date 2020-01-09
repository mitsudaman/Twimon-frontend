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
  :class="{'back-ground-color-sm-and-down': breakpoint.smAndDown}"> 
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <type-list 
        :name="name" 
        :types="types" 
        :searchTypes="searchTypes" 
        :withDescription="withDescription"
        :talkEditedFlg="talkEditedFlg"
        @child-event="onSearchUsers"/>
        <!-- <monster-list :users="users"/> -->
        {{users}}
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
import TypeList from '~/components/TypeList.vue'
import GET_USERS_GQL from '~/apollo/queries/getUsers.gql'

export default {
  transition (to, from) {
    if (from && from.name === 'read-id') return 'index'
  },
  components: {
    MonsterList,
    TypeList
  },
  data () {
    return {
      isHydrated: false,
      name: '',
      withDescription: true,
      talkEditedFlg: false,
      user: {
      },
      page: 1,
      users: null,
      lastPage: 0,
      searchTypes:[],
      types: [],
    }
  },
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.xs) binding.column = true
      return binding
    },
    breakpoint () {
      return this.isHydrated
        ? this.$vuetify.breakpoint
        : ''
    }
  },
  mounted() {
    this.isHydrated = true
    if (localStorage.page) {
      this.page = Number(localStorage.page);
    }
  },
  watch: {
    page(newPage) {
      localStorage.page = newPage;
    }
  },
  apollo: {
    users: {
      query: GET_USERS_GQL,
      variables () {
        return {
          perPage:24,
          page: this.page,
          name: this.name,
          searchTypes:this.searchTypes,
          withDescription: this.withDescription,
          talkEditedFlg: this.talkEditedFlg
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
      this.page = 1
      this.searchTypes  = _.filter(this.types, function(n) { return n.select; });
      this.searchTypes = _.map(this.searchTypes,(n)=>{
        return (_.pick(n, ['name'])).name;
      })
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
</style>