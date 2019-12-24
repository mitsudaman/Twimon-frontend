<template>
  <v-row>
    <v-col>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            タイプで探す
            <template v-slot:actions>
              <v-icon :color="$vuetify.theme.themes.light.background">mdi-magnify</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row
              align="center"
              justify="center">
              <v-col v-for="type in types" 
              v-bind:key="type.id" cols="4" md="3">
                <v-card  
                  outlined 
                  v-on:click='type.select=!type.select' 
                  v-bind:class="[{active:type.select},type.class]"
                  class="caption font-weight-bold ty-area"> 
                  {{type.name}} 
                </v-card>
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
}
</script>
