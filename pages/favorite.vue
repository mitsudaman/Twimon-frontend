<template>
  <v-container fluid fill-height text-center
  :class="{'back-ground-color-sm-and-down': $vuetify.breakpoint.smAndDown}">
    <v-row 
      align="center"
      justify="center"
      no-gutters>
      <v-col>
        <v-row>
          <v-col>

            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                  タイプで探す
                  <template v-slot:actions>
                    <v-icon color="error">mdi-alert-circle</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row
                    align="center"
                    justify="center">
                    <v-col v-for="type in types" 
                    v-bind:key="type.id" cols="4" md="3">
                      <v-card  outlined :color="type | getTypeColor" class="white--text caption font-weight-bold type_area"> {{type}} </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row v-if="likeUsers && likeUsers.length==0">
          <v-col >
            <p class="mb-5 title">お気に入りのモンスターが登録されていません！</p>
          </v-col>
        </v-row>
        {{likeUsers}}
        <v-row
          align="center"
          justify="center"
          class="py-3">
          <v-col cols="10" class="text-center">
            <v-btn
              rounded
              block
              @click="onSearchLikeUsers"
              color="primary">
              <span>こうしん</span>
            </v-btn>
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
import GET_LIKE_USERS_GQL from '~/apollo/queries/getLikeUsers.gql'
import _ from 'lodash'

export default {
  middleware: 'authenticated',
  transition (to, from) {
    if (from && from.name === 'read-id') return 'index'
  },
  components: {
    MonsterList
  },
  data () {
    return {
      page: 1,
      lastPage: 0,
      type1:'',
      type2:'',
      types: [
        'ノーマル',
        'ほのお', 
        'みず', 
        'くさ', 
        'でんき', 
        'こおり',
        'かくとう',
        'どく',
        'じめん',
        'ひこう',
        'エスパー',
        'むし',
        'いわ',
        'ゴースト',
        'ドラゴン',
        'あく',
        'はがね',
        'フェアリー'
      ],
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
          page: this.page,
          type1:this.type1,
          type2:this.type2
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
      this.type1="みず"
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