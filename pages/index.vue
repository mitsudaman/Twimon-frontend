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
        <type-list :types="types" @child-event="onSearchUsers"/>
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
      title: '',
      height: '',
      weight: '',
      user: {
      },
      page: 1,
      users: null,
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
    users: {
      query: GET_USERS_GQL,
      variables () {
        return {
          perPage:12,
          page: this.page,
          searchTypes:this.searchTypes,
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