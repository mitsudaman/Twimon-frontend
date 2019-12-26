<template>
  <v-container fluid fill-height text-center
  :class="{'back-ground-color-sm-and-down': breakpoint.smAndDown}">
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <type-list :types="types" @child-event="onSearchLikeUsers"/>
        <v-row v-if="likeUsers && likeUsers.length==0">
          <v-col >
            <p class="mb-5 title">お気に入りのモンスターが登録されていません！</p>
          </v-col>
        </v-row>
        <!-- {{likeUsers}} -->
        <!-- <monster-list :users="likeUsers"/> -->
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
      types: [
        {name:'ノーマル',class:'ty1',select:false},
        // {name:'ほのお',class:'ty2',select:false},
        // {name:'みず',class:'ty3',select:false},
        // {name:'くさ',class:'ty4',select:false},
        // {name:'でんき',class:'ty5',select:false},
        // {name:'こおり',class:'ty6',select:false},
        // {name:'かくとう',class:'ty7',select:false},
        // {name:'どく',class:'ty8',select:false},
        // {name:'じめん',class:'ty9',select:false},
        // {name:'ひこう',class:'ty10',select:false},
        // {name:'エスパー',class:'ty11',select:false},
        // {name:'むし',class:'ty12',select:false},
        {name:'いわ',class:'ty13',select:false},
        // {name:'ゴースト',class:'ty14',select:false},
        // {name:'ドラゴン',class:'ty15',select:false},
        // {name:'あく',class:'ty16',select:false},
        {name:'はがね',class:'ty17',select:false},
        // {name:'フェアリー',class:'ty18',select:false},
      ],
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
  },
  apollo: {
    likeUsers: {
      query: GET_LIKE_USERS_GQL,
      variables () {
        return {
          perPage: 12,
          page: this.page,
          searchTypes:this.searchTypes,
        }
      },
      update (data) {
        this.lastPage = data.getLikeUsers.paginatorInfo.lastPage
        return data.getLikeUsers.likeUsers
      }
    }
  },
  methods: {
    onSearchLikeUsers () {
      this.searchTypes  = _.filter(this.types, function(n) { return n.select; });
      this.searchTypes = _.map(this.searchTypes,(n)=>{
        return (_.pick(n, ['name'])).name;
      })
      console.log(this.searchTypes)
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