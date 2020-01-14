<template>
  <v-container fluid fill-height text-center
  :class="{'back-ground-color-sm-and-down': breakpoint.smAndDown}">
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <type-list @child-event="onSearchLikeUsers"/>
        <v-row v-if="likeUsers && likeUsers.length==0">
          <v-col>
            <p class="mb-5 title">お気に入りのモンスターが登録されていません！</p>
          </v-col>
        </v-row>
        <monster-list :users="likeUsers"/>
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
import GET_LIKE_USERS_GQL from '~/apollo/queries/getLikeUsers.gql'
import _ from 'lodash'

export default {
  middleware: 'authenticated',
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
      page: 1,
      lastPage: 0,
      searchTypes:[],
      name: '',
      withDescription: false,
      talkEditedFlg: false,
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
    if (localStorage.tw_fa_page) {
      this.page = Number(localStorage.tw_fa_page);
    }
    if (localStorage.types) {
      this.searchTypes  = _.filter(JSON.parse(localStorage.getItem("types")), function(n) { return n.select; });
      this.searchTypes = _.map(this.searchTypes,(n)=>{
        return (_.pick(n, ['name'])).name;
      })
    }
  },
  watch: {
    page(newPage) {
      localStorage.tw_fa_page = newPage;
    }
  },
  apollo: {
    $prefetch: false,
    likeUsers: {
      query: GET_LIKE_USERS_GQL,
      variables () {
        return {
          perPage: 1,
          page: this.page,
          name: this.name,
          searchTypes:this.searchTypes,
          withDescription: this.withDescription,
          talkEditedFlg: this.talkEditedFlg
        }
      },
      update (data) {
        this.lastPage = data.getLikeUsers.paginatorInfo.lastPage
        return data.getLikeUsers.likeUsers
      },
      error (error) {
        return $router.push({ path: '/login'})
      },
    }
  },
  methods: {
    onSearchLikeUsers () {
      localStorage.tw_fa_name = this.name;
      localStorage.tw_fa_with_description = this.withDescription;
      localStorage.tw_fa_talk_edited_flg = this.talkEditedFlg;
      const parsed = JSON.stringify(this.types);
      localStorage.setItem('tw_fa_types', parsed);
      this.searchTypes  = _.filter(this.types, function(n) { return n.select; });
      this.searchTypes = _.map(this.searchTypes,(n)=>{
        return (_.pick(n, ['name'])).name;
      })
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
.like_panel_red {
  color:#ea3f60
}
.nameText{
  font-size: 11px;
}
</style>