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
              <v-col cols="6" md="5" class="text-left ">
                <label>かいわ　</label>
                <v-switch 
                v-model="talkEditedFlg" 
                class="mt-2"
                inset>
                  <template v-slot:label>
                    <template v-if="talkEditedFlg">
                      アレンジのみ
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
                  v-bind:class="[{active:type.select},type.class]"
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
  props: {
    types: Array
  },
  data () {
    return {
      name: '',
      withDescription: true,
      withTalkMonsters: true,
      talkEditedFlg: false,
    }
  },
  methods:{
    onSendParent(){
        this.$parent.name = this.name;
        this.$parent.withDescription = this.withDescription;
        this.$parent.talkEditedFlg = this.talkEditedFlg;
        this.$emit('child-event');
    }
  }
}
</script>
