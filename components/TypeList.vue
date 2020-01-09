<template>
  <v-row>
    <v-col>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            <span class="font-weight-bold">なまえまたはタイプで探す</span>
            <template v-slot:actions>
              <v-icon :color="$vuetify.theme.themes.light.background">mdi-magnify</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="name"
                  label="なまえ"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="4" class="text-left ">
                <label>せつめい</label>
                <v-switch 
                v-model="withDescription" 
                class="mt-2"
                inset>
                  <template v-slot:label>
                    <template v-if="withDescription">
                      ありのみ
                    </template>
                    <template v-else>
                      ぜんぶ
                    </template>
                  </template>
                </v-switch>
              </v-col>
              <v-col cols="6" class="text-left ">
                <label>かいわ　</label>
                <v-switch 
                v-model="talkEditedFlg" 
                class="mt-2"
                inset>
                  <template v-slot:label>
                    <template v-if="talkEditedFlg">
                      アレンジ
                    </template>
                    <template v-else>
                      すべて
                    </template>
                  </template>
                </v-switch>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center">
              <v-col v-for="type in types" 
              v-bind:key="type.id" cols="4" md="3" class="py-1">
                <v-card  
                  outlined 
                  v-on:click='type.select=!type.select' 
                  class="caption font-weight-bold ty-area"> 
                  {{type.name}} 
                </v-card>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center"
              class="py-3">
              <v-col cols="10" class="text-center">
                <v-btn
                  rounded
                  block
                  @click="onSendParent()"
                  color="primary">
                  <span>けんさく</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // props: {
  //   types: Array
  // },
  data () {
    return {
      name: '',
      types: [
        {name:'ノーマル',class:'ty1',select:false},
        {name:'ほのお',class:'ty2',select:false},
        {name:'みず',class:'ty3',select:false},
        {name:'くさ',class:'ty4',select:false},
        {name:'でんき',class:'ty5',select:false},
        {name:'こおり',class:'ty6',select:false},
        {name:'かくとう',class:'ty7',select:false},
        {name:'どく',class:'ty8',select:false},
        {name:'じめん',class:'ty9',select:false},
        {name:'ひこう',class:'ty10',select:false},
        {name:'エスパー',class:'ty11',select:false},
        {name:'むし',class:'ty12',select:false},
        {name:'いわ',class:'ty13',select:false},
        {name:'ゴースト',class:'ty14',select:false},
        {name:'ドラゴン',class:'ty15',select:false},
        {name:'あく',class:'ty16',select:false},
        {name:'はがね',class:'ty17',select:false},
        {name:'フェアリー',class:'ty18',select:false},
      ],
      searchTypes:[],
      withDescription: true,
      withTalkMonsters: true,
      talkEditedFlg: false,
    }
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
      this.$parent.name = this.name;
    }
    if (localStorage.withDescription) {
      var boolean = localStorage.withDescription == 'true' ? true : false;
      this.withDescription = boolean;
      this.$parent.withDescription = boolean;
    }
    if (localStorage.talkEditedFlg) {
      var boolean = localStorage.talkEditedFlg == 'true' ? true : false;
      this.talkEditedFlg = boolean;
      this.$parent.talkEditedFlg = boolean;
    }
    if (localStorage.types) {
      // this.types = JSON.parse(localStorage.getItem('types'))
      this.$parent.searchTypes  = _.filter(this.types, function(n) { return n.select; });
      this.$parent.searchTypes = _.map(this.searchTypes,(n)=>{
        return (_.pick(n, ['name'])).name;
      })
      console.log(this.$parent.searchTypes)
    }
  },
  watch: {
    // types(newTypes) {
    //   localStorage.types = this.types.join(',');
    // },
    name(newName) {
      localStorage.name = newName;
    },
    withDescription(newWithDescription) {
      localStorage.withDescription = newWithDescription;
    },
    withTalkMonsters(newTalkEditedFlg) {
      localStorage.talkEditedFlg = newTalkEditedFlg;
    },
  },
  methods:{
    onSendParent(){
        this.$parent.name = this.name;
        this.$parent.withDescription = this.withDescription;
        this.$parent.talkEditedFlg = this.talkEditedFlg;

        // タイプをjson化してローカルストレージに格納
        const parsed = JSON.stringify(this.types);
        localStorage.setItem('types', parsed);
        this.$parent.types = this.types;

        this.$emit('child-event');
    }
  }
}
</script>
