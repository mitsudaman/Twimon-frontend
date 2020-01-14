<template>
  <v-container fluid fill-height text-center
  :class="{'back-ground-color-sm-and-down': breakpoint.smAndDown}"> 
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <type-list @child-event="onSearchUsers"/>
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
      querySkip: true,
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
    if (localStorage.tw_page) {
      this.page = Number(localStorage.tw_page);
    }
    if (localStorage.tw_types) {
      this.types = JSON.parse(localStorage.getItem('tw_types'))
      this.searchTypes  = _.filter(this.types, function(n) { return n.select; });
      this.searchTypes = _.map(this.searchTypes,(n)=>{
        return (_.pick(n, ['name'])).name;
      })
    }
    this.querySkip = false;
  },
  watch: {
    page(newPage) {
      localStorage.tw_page = newPage;
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
      },
      skip() {
        return this.querySkip
      },
    }
  },
  methods: {
    onSearchUsers () {
      localStorage.tw_name = this.name;
      localStorage.tw_with_description = this.withDescription;
      localStorage.tw_talk_edited_flg = this.talkEditedFlg;
      const parsed = JSON.stringify(this.types);
      localStorage.setItem('tw_types', parsed);
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