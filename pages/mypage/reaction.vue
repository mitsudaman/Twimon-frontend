<template>
  <div>
    <v-container fluid fill-height
      :class="{'back-ground-color-sm-and-down': $vuetify.breakpoint.smAndDown}">
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbar_color"
        :timeout=3000>
        <span class="snackbar_text">{{ snackbar_text }}</span>
      </v-snackbar>
      <v-row 
        align="center"
        justify="center"
        no-gutters
        class="text-center">
        <v-col>
          <my-page-nav></my-page-nav>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        no-gutters
        class="mt-5">
        <v-col>
          <v-card class="py-5">
            <v-row 
              v-if="settingPanel"
              justify="center"
              no-gutters>
              <v-col cols="10">
                <v-row>
                  <v-col cols="11" sm="3" mt-4 pb-0  align-center>
                    <div class="svg_area">
                      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512.05 512.05" class="reaction_list_svg" style="enable-background:new 0 0 512.05 512.05;" xml:space="preserve">
                        <path style="fill:#2196F3;" d="M256.025,0.05C117.67-2.678,3.184,107.038,0.025,245.383c0.361,70.423,31.544,137.157,85.333,182.613
                          v73.387c0,5.891,4.776,10.667,10.667,10.667c1.999,0,3.958-0.562,5.653-1.621l59.456-37.141
                          c30.292,11.586,62.459,17.494,94.891,17.429c138.355,2.728,252.841-106.988,256-245.333C508.866,107.038,394.38-2.678,256.025,0.05z
                          "/>
                        <path style="fill:#FAFAFA;" d="M424.558,174.983c-3.174-4.254-8.993-5.527-13.653-2.987l-110.933,60.48l-69.013-59.179
                        c-4.232-3.628-10.544-3.387-14.485,0.555l-128,128c-4.153,4.178-4.133,10.932,0.046,15.085c3.341,3.321,8.464,4.057,12.605,1.811
                        l110.933-60.48l69.077,59.2c4.232,3.628,10.544,3.387,14.485-0.555l128-128C427.35,185.148,427.75,179.215,424.558,174.983z"/>
                      </svg>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="9" mt-4 pb-0  align-center>
                    <div class="reaction_list_title">
                      会話を追加する
                      <div class="reaction_list_edit" @click="onVisibleTalkPanel">
                        編集
                      </div>
                    </div>
                    <p class="reaction_list_text">ユーザーが【はなす】コマンドを押したときに表示されるメッセージです。複数設定すると、押される度に順番に表示されます。最大5個設定できます。(140文字以内)</p>
                  </v-col>
                </v-row>
                <v-row class="border-top pt-5">
                  <v-col cols="11" sm="3">
                    <div class="svg_area">
                      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <path style="fill:#58BFFF;" d="M180.385,376.721l-117.24,117.24c-10.73,10.73-28.126,10.73-38.856,0l0,0
                          c-10.73-10.73-10.73-28.126,0-38.856l117.24-117.24L180.385,376.721z"/>
                        <path style="fill:#FFCDAC;" d="M458.101,237.005v8.02c0,17.718-14.363,32.081-32.081,32.081l0,0l0,0
                          c-17.718,0-32.081-14.363-32.081-32.081v-8.02c0-17.718,14.363-32.081,32.081-32.081l0,0
                          C443.738,204.924,458.101,219.287,458.101,237.005z"/>
                        <path style="fill:#FFBC53;" d="M447.654,277.106h-43.266c-30.015,0-54.346,24.332-54.346,54.346v20.134H502v-20.134
                          C502,301.437,477.668,277.106,447.654,277.106z"/>
                        <path style="fill:#FFCDAC;" d="M53.899,237.005v8.02c0,17.718,14.363,32.081,32.081,32.081l0,0l0,0
                          c17.718,0,32.081-14.363,32.081-32.081v-8.02c0-17.718-14.363-32.081-32.081-32.081l0,0
                          C68.262,204.924,53.899,219.287,53.899,237.005z"/>
                        <path style="fill:#95E540;" d="M64.346,277.106h43.266c30.015,0,54.346,24.332,54.346,54.346v20.134H10v-20.134
                          C10,301.437,34.332,277.106,64.346,277.106z"/>
                        <circle style="fill:#A5DDFF;" cx="256" cy="254.28" r="138"/>
                        <circle style="fill:#FFFFFF;" cx="256" cy="254.28" r="97.97"/>
                        <path style="fill:#FFCDAC;" d="M287.073,241.727v7.768c0,17.161-13.912,31.073-31.073,31.073l0,0l0,0
                          c-17.161,0-31.073-13.912-31.073-31.073v-7.768c0-17.161,13.912-31.073,31.073-31.073l0,0
                          C273.161,210.653,287.073,224.565,287.073,241.727z"/>
                        <path style="fill:#FE6663;" d="M256,280.568L256,280.568c-30.333,0-56.247,18.843-66.726,45.454
                          c17.497,16.28,40.942,26.253,66.726,26.253c25.785,0,49.229-9.973,66.726-26.253C312.247,299.411,286.333,280.568,256,280.568z"/>
                        <path d="M460.934,268.491c4.524-6.708,7.168-14.784,7.168-23.466v-8.021c0-23.203-18.878-42.081-42.081-42.081
                          c-11.577,0-22.077,4.701-29.693,12.293C376.622,148.609,321.163,106.275,256,106.275s-120.622,42.333-140.328,100.941
                          c-7.616-7.592-18.115-12.293-29.693-12.293c-23.203,0-42.081,18.878-42.081,42.081v8.021c0,8.682,2.644,16.758,7.168,23.466
                          C21.937,274.629,0,300.524,0,331.452v20.134c0,5.522,4.478,10,10,10h52c5.522,0,10-4.478,10-10s-4.478-10-10-10H20v-10.134
                          c0-24.453,19.894-44.347,44.347-44.347h47.329c3.838,16.881,10.565,32.677,19.641,46.831L17.218,448.035
                          c-14.61,14.611-14.61,38.386,0.001,52.998c7.306,7.306,16.901,10.958,26.498,10.958s19.194-3.653,26.5-10.958l62.903-62.904
                          c3.905-3.905,3.905-10.237,0-14.143c-3.906-3.904-10.236-3.904-14.143,0L56.075,486.89c-6.815,6.814-17.901,6.813-24.715,0.001
                          c-6.813-6.814-6.813-17.901,0-24.715L143.367,350.17c27.167,31.862,67.578,52.105,112.633,52.105
                          c70.328,0,129.35-49.31,144.324-115.17h47.329c24.453,0,44.347,19.894,44.347,44.347v10.134h-94c-5.522,0-10,4.478-10,10
                          s4.478,10,10,10h104c5.522,0,10-4.478,10-10v-20.134C512,300.524,490.063,274.629,460.934,268.491z M403.939,237.005
                          c0-12.176,9.905-22.081,22.081-22.081s22.081,9.905,22.081,22.081v8.021c0,12.175-9.905,22.08-22.081,22.08
                          s-22.081-9.905-22.081-22.08V237.005z M63.898,237.005c0-12.176,9.905-22.081,22.081-22.081s22.081,9.905,22.081,22.081v8.021
                          c0,12.175-9.905,22.08-22.081,22.08s-22.081-9.905-22.081-22.08C63.898,245.026,63.898,237.005,63.898,237.005z M256,382.275
                          c-70.579,0-128-57.421-128-128s57.421-128,128-128s128,57.421,128,128S326.579,382.275,256,382.275z"/>
                        <path d="M256,146.275c-59.552,0-108,48.448-108,108c0,30.91,13.056,58.825,33.938,78.53c0.357,0.386,0.74,0.75,1.16,1.08
                          c19.226,17.621,44.829,28.39,72.902,28.39s53.676-10.77,72.902-28.39c0.42-0.329,0.803-0.694,1.16-1.08
                          C350.944,313.1,364,285.185,364,254.275C364,194.724,315.552,146.275,256,146.275z M201.503,323.321
                          c10.625-20.104,31.331-32.753,54.497-32.753s43.872,12.649,54.497,32.753c-14.998,11.863-33.934,18.954-54.497,18.954
                          S216.501,335.184,201.503,323.321z M234.927,249.495v-7.769c0-11.62,9.453-21.073,21.073-21.073s21.073,9.453,21.073,21.073v7.769
                          c0,11.62-9.453,21.073-21.073,21.073S234.927,261.115,234.927,249.495z M325.125,308.674c-9.161-14.617-22.57-25.764-38.264-32.12
                          c6.349-7.233,10.212-16.7,10.212-27.058v-7.769c0-22.647-18.426-41.073-41.073-41.073s-41.073,18.426-41.073,41.073v7.769
                          c0,10.358,3.862,19.825,10.212,27.058c-15.694,6.357-29.102,17.503-38.264,32.12C175.059,293.692,168,274.793,168,254.275
                          c0-48.523,39.477-88,88-88s88,39.477,88,88C344,274.793,336.941,293.692,325.125,308.674z"/>
                        <path d="M152.8,394.309c-2.63,0-5.21,1.07-7.07,2.93c-1.859,1.86-2.93,4.44-2.93,7.07s1.07,5.21,2.93,7.07
                          c1.86,1.859,4.44,2.93,7.07,2.93s5.21-1.07,7.07-2.93c1.859-1.86,2.93-4.44,2.93-7.07s-1.07-5.21-2.93-7.07
                          C158.01,395.379,155.43,394.309,152.8,394.309z"/>
                        <path d="M256.203,54.033c5.522,0,10-4.478,10-10V10.009c0-5.522-4.478-10-10-10s-10,4.478-10,10v34.024
                          C246.203,49.556,250.681,54.033,256.203,54.033z"/>
                        <path d="M256.2,87.009c2.64,0,5.21-1.07,7.069-2.931c1.86-1.859,2.931-4.439,2.931-7.069s-1.07-5.21-2.931-7.07
                          c-1.859-1.86-4.43-2.93-7.069-2.93c-2.631,0-5.21,1.069-7.07,2.93s-2.93,4.44-2.93,7.07s1.069,5.21,2.93,7.069
                          C250.99,85.938,253.569,87.009,256.2,87.009z"/>
                        <path d="M316.332,73.883c2.56,0,5.118-0.977,7.071-2.929l17.576-17.576c3.905-3.905,3.905-10.237,0-14.143
                          c-3.906-3.904-10.236-3.904-14.143,0L309.26,56.811c-3.905,3.905-3.905,10.237,0,14.143
                          C311.214,72.906,313.772,73.883,316.332,73.883z"/>
                        <path d="M188.766,71.075c1.953,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.071-2.929c3.905-3.905,3.905-10.237,0-14.143
                        l-17.745-17.745c-3.906-3.904-10.236-3.904-14.143,0c-3.905,3.905-3.905,10.237,0,14.143L188.766,71.075z"/>
                      </svg>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="9">
                    <div class="reaction_list_title">
                      リンクを追加する
                      <div class="reaction_list_edit" @click="onVisibleSearchPanel">
                        編集
                      </div>
                    </div>
                    <p class="font-weight-thin reaction_list_text">ユーザーが【しらべる】コマンドを押したときに表示されるリンクの一覧です。リンク名とURLを最大5個設定できます。</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row 
              v-if="talkPanel"
              align="center"
              justify="center"
              no-gutters
              class="mt-5">
              <v-col cols="11">   
                <v-row
                  v-for="(talk,index) in me.talks"
                  v-bind:key="talk.id"
                  class="">
                  <v-col>
                    <v-row no-gutters>
                      <v-col cols="9">
                        <label class="ml-1 font-weight-bold headline">会話{{index+1}}</label>
                      </v-col>
                      <v-col v-if="me.talks.length + newTalks.length >1" cols="3" class="text-right">
                        <button class="red--text" @click="onDeleteUserTalk(talk.id)">
                          <i class="fas fa-times"></i> 削除
                        </button>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="pb-0">
                        <v-textarea
                          v-model="talk.sentence1"
                          outlined
                          label=""
                          hide-details
                          placeholder="こんにちわ"
                          :error="getLen(talk.sentence1) > 50">
                        </v-textarea>
                        <v-row 
                          no-gutters
                          v-bind:class="{'red--text': getLen(talk.sentence1) > 50}">
                          <v-col cols="9" class="pl-1">
                            <small
                            v-if="getLen(talk.sentence1) > 20">50文字以下で入力してください</small>
                          </v-col>
                          <v-col cols="3" class="text-right">
                            <small>{{getLen(talk.sentence1)}} / 20</small>
                          </v-col>
                        </v-row>
                        <v-textarea
                          v-model="talk.sentence2"
                          outlined
                          label=""
                          class="mt-3"
                          hide-details
                          placeholder="こんにちわ"
                          :error="getLen(talk.sentence2) > 50">
                        </v-textarea>
                        <v-row 
                          no-gutters
                          v-bind:class="{'red--text': getLen(talk.sentence2) > 50}">
                          <v-col cols="9" class="pl-1">
                            <small
                            v-if="getLen(talk.sentence2) > 20">50文字以下で入力してください</small>
                          </v-col>
                          <v-col cols="3" class="text-right">
                            <small>{{getLen(talk.sentence2)}} / 20</small>
                          </v-col>
                        </v-row>
                        <v-textarea
                          v-model="talk.sentence3"
                          outlined
                          label=""
                          class="mt-3"
                          hide-details
                          placeholder="こんにちわ"
                          :error="getLen(talk.sentence3) > 50">
                        </v-textarea>
                        <v-row 
                          no-gutters
                          v-bind:class="{'red--text': getLen(talk.sentence3) > 50}">
                          <v-col cols="9" class="pl-1">
                            <small
                            v-if="getLen(talk.sentence3) > 20">50文字以下で入力してください</small>
                          </v-col>
                          <v-col cols="3" class="text-right">
                            <small>{{getLen(talk.sentence3)}} / 20</small>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row
                  v-for="(talk,index) in newTalks"
                  v-bind:key="talk.id"
                  class="mt-3">
                  <v-col>
                    <v-row no-gutters>
                      <v-col cols="9">
                        <label class="ml-1 font-weight-bold headline">会話{{me.talks.length + index + 1}}</label>
                      </v-col>
                      <v-col v-if="me.talks.length + newTalks.length >1" cols="3" class="text-right">
                        <button class="red--text" @click="onDeleteUserNewTalk(talk.id)">
                          <i class="fas fa-times"></i> 削除
                        </button>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="pb-0">
                        <v-textarea
                          v-model="talk.sentence1"
                          outlined
                          label=""
                          hide-details
                          placeholder="こんにちわ"
                          :error="getLen(talk.sentence1) > 50">
                        </v-textarea>
                        <v-row 
                          no-gutters
                          v-bind:class="{'red--text': getLen(talk.sentence1) > 50}">
                          <v-col cols="9" class="pl-1">
                            <small
                            v-if="getLen(talk.sentence1) > 20">50文字以下で入力してください</small>
                          </v-col>
                          <v-col cols="3" class="text-right">
                            <small>{{getLen(talk.sentence1)}} / 20</small>
                          </v-col>
                        </v-row>
                        <v-textarea
                          v-model="talk.sentence2"
                          outlined
                          label=""
                          class="mt-3"
                          hide-details
                          placeholder="こんにちわ"
                          :error="getLen(talk.sentence2) > 50">
                        </v-textarea>
                        <v-row 
                          no-gutters
                          v-bind:class="{'red--text': getLen(talk.sentence2) > 50}">
                          <v-col cols="9" class="pl-1">
                            <small
                            v-if="getLen(talk.sentence2) > 20">50文字以下で入力してください</small>
                          </v-col>
                          <v-col cols="3" class="text-right">
                            <small>{{getLen(talk.sentence2)}} / 20</small>
                          </v-col>
                        </v-row>
                        <v-textarea
                          v-model="talk.sentence3"
                          outlined
                          label=""
                          class="mt-3"
                          hide-details
                          placeholder="こんにちわ"
                          :error="getLen(talk.sentence3) > 50">
                        </v-textarea>
                        <v-row 
                          no-gutters
                          v-bind:class="{'red--text': getLen(talk.sentence3) > 50}">
                          <v-col cols="9" class="pl-1">
                            <small
                            v-if="getLen(talk.sentence3) > 20">50文字以下で入力してください</small>
                          </v-col>
                          <v-col cols="3" class="text-right">
                            <small>{{getLen(talk.sentence3)}} / 20</small>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="11" class="my-5">
                <v-btn
                  rounded
                  block
                  :disabled="this.me.talks.length + this.newTalks.length >= 5"
                  @click="onCreateUserTalk"
                  color="primary">
                  <span><i class="fas fa-plus"></i> ついか </span>
                </v-btn>
                <v-btn
                  rounded
                  block
                  class="mt-4"
                  @click="onUpdateUserTalks"
                  :disabled="!isTalkUpdatable"
                  color="primary">
                  <span><i class="fas fa-pen"></i> こうしん</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row 
              v-if="searchPanel"
              align="center"
              justify="center"
              no-gutters>
              <v-col cols="11" md="10">
                <label class="ml-1 font-weight-bold">
                  <i class="fas fa-link"></i>
                  <template v-if="me.url1_name">{{me.url1_name}}</template>
                  <template v-else>リンク</template>
                </label>
                <v-text-field
                  v-model="me.url1"
                  outlined
                  hide-details
                  single-line
                  class="py-2"
                ></v-text-field>
              </v-col>
              <v-col cols="11" md="10" class="mt-5">
                <label class="ml-1 font-weight-bold">
                  <i class="fas fa-link"></i>
                  <template v-if="me.url2_name">{{me.url2_name}}</template>
                  <template v-else>リンク</template>
                </label>
                <v-text-field
                  v-model="me.url2"
                  outlined
                  hide-details
                  single-line
                  class="py-2"
                ></v-text-field>
              </v-col>
              <v-col cols="11" md="10" class="mt-5">
                <label class="ml-1 font-weight-bold">
                  <i class="fas fa-link"></i>
                  <template v-if="me.url3_name">{{me.url3_name}}</template>
                  <template v-else>リンク</template>
                </label>
                <v-text-field
                  v-model="me.url3"
                  outlined
                  hide-details
                  single-line
                  class="py-2"
                ></v-text-field>
              </v-col>
              <v-col cols="11" md="10" class="mt-5">
                <label class="ml-1 font-weight-bold">
                  <i class="fas fa-link"></i>
                  <template v-if="me.url4_name">{{me.url4_name}}</template>
                  <template v-else>リンク</template>
                </label>
                <v-text-field
                  v-model="me.url4"
                  outlined
                  hide-details
                  single-line
                  class="py-2"
                ></v-text-field>
              </v-col>
              <v-col cols="11" md="10" class="mt-5">
                <label class="ml-1 font-weight-bold">
                  <i class="fas fa-link"></i>
                  <template v-if="me.url5_name">{{me.url5_name}}</template>
                  <template v-else>リンク</template>
                </label>
                <v-text-field
                  v-model="me.url5"
                  outlined
                  hide-details
                  single-line
                  class="py-2"
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="my-7">
                <v-btn
                  rounded
                  block
                  :loading="isLoadingUpdateUserDetailBtn"
                  @click="onUpdateUserDetail"
                  color="primary">
                  <span><i class="fas fa-pen"></i> こうしん</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import GET_ME from '~/apollo/queries/getMe.gql'
import MyPageNav from '~/components/MyPageNav.vue'
import UPDATE_USER_TALKS_GQL from '~/apollo/mutations/updateUserTalks.gql'
import UPDATE_USER_DETAIL_GQL from '~/apollo/mutations/updateUserDetail.gql'
import _ from 'lodash'

export default {
  middleware: 'authenticated',
  components: {
    MyPageNav
  },
  data () {
    return {
      me: {
      },
      snackbar: false,
      snackbar_color: 'success',
      snackbar_text: '',
      newTalks: [],
      delTalks: [],
      settingPanel: true,
      talkPanel: false,
      searchPanel: false,
      isLoadingUpdateUserDetailBtn: false
    }
  },
  apollo: {
    me: {
      query: GET_ME,
      update (data) {
        return _.cloneDeep(data.me)
      }
    }
  },
  computed: {
    isTalkUpdatable () {
      let updatableFlg = true
      _.forEach(this.me.talks, (n) => {
        if (this.getLen(n.sentence1) > 50 || this.getLen(n.sentence2) > 50 || this.getLen(n.sentence3) > 50) updatableFlg = false
      })
      _.forEach(this.newTalks, (n) => {
        if (this.getLen(n.sentence1) > 50 || this.getLen(n.sentence2) > 50 || this.getLen(n.sentence3) > 50) updatableFlg = false
      })
      return updatableFlg
    }
  },
  methods: {
    onVisibleTalkPanel () {
      this.onResetPanel()
      this.talkPanel = true
      if (this.me.talks.length + this.newTalks.length === 0) {
        this.newTalks.push({
          sentence1: '',
          sentence2: '',
          sentence3: ''
        })
      }
    },
    onVisibleSearchPanel () {
      this.onResetPanel()
      this.searchPanel = true
    },
    onResetPanel () {
      this.settingPanel = false
      this.talkPanel = false
      this.searchPanel = false
    },
    onDeleteUserTalk (delId) {
      this.me.talks = _.reject(this.me.talks, { 'id': delId })
      this.delTalks.push(delId)
    },
    onDeleteUserNewTalk (index) {
      this.newTalks.splice(index, 1)
    },
    onCreateUserTalk () {
      if (this.me.talks.length + this.newTalks.length >= 5) {
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text = '会話は5個までです'
        return
      }
      this.newTalks.push({
        sentence1: '',
        sentence2: '',
        sentence3: ''
      })
    },
    onUpdateUserTalks () {
      let updateTalks = _.map(this.me.talks, (n) => {
        return _.pick(n, ['id', 'sentence1', 'sentence2', 'sentence3'])
      })
      // ユーザー会話情報アップデート
      this.$apollo.mutate({
        mutation: UPDATE_USER_TALKS_GQL,
        variables: {
          UpdateUserTalksInput: {
            talks: {
              create: this.newTalks,
              update: updateTalks,
              delete: this.delTalks
            }
          }
        }
      }).then((data) => {
        this.me = data.data.updateUserTalks
        this.newTalks = []
        this.snackbar = true
        this.snackbar_color = 'success'
        this.snackbar_text = '会話を更新しました'
      }).catch(() => {
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text = '会話を更新できませんでした'
      })
    },
    onUpdateUserDetail () {
      this.isLoadingUpdateUserDetailBtn = true
      // ユーザー会話情報アップデート
      this.$apollo.mutate({
        mutation: UPDATE_USER_DETAIL_GQL,
        variables: {
          UpdateUserDetailInput: {
            url1: this.me.url1,
            url2: this.me.url2,
            url3: this.me.url3,
            url4: this.me.url4,
            url5: this.me.url5
          }
        }
      }).then((data) => {
        this.me = data.data.updateUserDetail
        this.isLoadingUpdateUserDetailBtn = false
        this.newTalks = []
        this.snackbar = true
        this.snackbar_color = 'success'
        this.snackbar_text = 'リンクを更新しました'
      }).catch(() => {
        this.isLoadingUpdateUserDetailBtn = false
        this.snackbar = true
        this.snackbar_color = 'error'
        this.snackbar_text = 'リンクを更新できませんでした'
      })
    },
    getLen (str) {
      if (str == null || str === '') return 0
      var result = 0
      for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i)
        if ((chr >= 0x00 && chr < 0x81) ||
          (chr === 0xf8f0) ||
          (chr >= 0xff61 && chr < 0xffa0) ||
          (chr >= 0xf8f1 && chr < 0xf8f4)) {
          result += 0.5
        } else {
          result += 1
        }
      }
      return result
    }
  }
}
</script>
<style type="text/css">
.reaction_list_text{
  color: #787c7b;
  font-size: 13px;
}
.svg_area{
    text-align: center;
    margin-top: 0;
    margin-bottom: 8px;
}
.reaction_list_svg{
  width: 104px;
}
.reaction_list_title {
    font-weight: bold;
    font-size: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 8px;
}
.reaction_list_edit {
    font-size: 14px;
    line-height: 1.5;
    margin-left: 16px;
    color: #2CB696;
    white-space: nowrap;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}
</style>