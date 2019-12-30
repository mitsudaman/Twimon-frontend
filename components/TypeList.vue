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
                  <span>こうしん</span>
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
      name: ''
    }
  },
  methods:{
    onSendParent(){
        this.$parent.name = this.name;
        this.$emit('child-event');
    }
  }
}
</script>
