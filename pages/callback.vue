<template>
  <div>
    <p v-if="attempting">Twitterでログインしています。</p>
    <template v-else>
      <p>{{failedMessage}}</p>
      <p>{{$store.state.twimonToken}}</p>
    </template>
    <v-btn
      :block=true
      :large=true
      @click="commandTalk"
      color="grey darken-3 white--text">
      <span><i class="far fa-comment-dots"></i> ボタン</span>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AUTHENTICATE_USER_GQL from '~/apollo/mutations/authenticateUserGql.gql'
import UPDATE_USER_PROF_GQL from '~/apollo/mutations/updateUserProf.gql'
import GET_AUTHED_USER_GQL from '~/apollo/queries/getAuthedUser.gql'

export default {
  // middleware: 'guest',

  data () {
    return {
      failedMessage: null
    }
  },
  created (){
    this.$apollo.mutate({
        mutation: AUTHENTICATE_USER_GQL, 
      })
      .then(({data}) => { 
        // Query work fine and result is the proper data object
        // console.log(data.authenticateUserGql.access_token)
        this.$store.commit('setToken',{ token: data.authenticateUserGql.access_token})
        this.$store.commit('setUser',{ user: data.authenticateUserGql.me})
        this.$router.replace('/');
      })
      .catch((error) => {
        // This should log the error object but is just printing out the message
        console.log(error);
        this.failedMessage = 'Twitterでのログインに失敗しました。';
      });

    // this.$apollo.query({
    //     query: GET_AUTHED_USER_GQL,
    //     variables: {
    //         var1: "this is a variable"
    //     },
    //     context: {
    //       headers: {
    //           "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMxMzNhYTliMDhjYjQ5Mzc2MTU3MzI4ODU2ZDhjYjFlZTQ2MjdmZDcxZGM2YzVmZjU4MmIwMGRjMzcyNmEwZTExODk1NjM4YTcyMjQxNTk0In0.eyJhdWQiOiIxIiwianRpIjoiMzEzM2FhOWIwOGNiNDkzNzYxNTczMjg4NTZkOGNiMWVlNDYyN2ZkNzFkYzZjNWZmNTgyYjAwZGMzNzI2YTBlMTE4OTU2MzhhNzIyNDE1OTQiLCJpYXQiOjE1NjIzMTAzMjIsIm5iZiI6MTU2MjMxMDMyMiwiZXhwIjoxNTkzOTMyNzIyLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.H8REUy29uvoooHA6ggU86VI7iTYZ3pCKexFqUYo6ZJwCUQZo4MpOrHt4X7XAa-PhcnhsvnbomSpkIAyzrFCpc06kPr5t-LzTHaVi9zO6eFjFr_qWgqI9A2vYu4uYZNXdwiEgA10ODN3WvH6zUvucAROCfAtRNC5KXf8kbvsskkB-8VsXKSoEDxKhJ599AEdkwLDL-naUeB3vN0i6ZN8ukNPXmaB1IK8MY-GXKB-0lCOCdmInr7_qdo_--S2dEu7GMHF1fNEVbP_HvHPYBxnP21VfSjexYNSx9B_IkSWJVNs1w2pUGqCCqF-k9u7k7Bskvfk3OgHUPQuB1YWvk38OC-rYsv3blY07zKWf0jgOr4eGhe87-MEetaYqq2tZwrtLfGeBjgC3uaej8Hcq7H9qkw_1HwskulWwZSowtA5i67hfL-ZHOjYQD14HOMq5AO2Tz8wfMRUApucF9088tW_Jh-qI0cZV8qlG6KRQtBUjur5bwfheTRkOtiFzTpalRmbrQbNKtoLNurxQsZ5pgLRBsdX1NKRRzOIDNKxcwDDLOn6ETCYlquOm6UT68hs81GNBUeZQidLwIDI5eIlXeDr8rqJt04S_nrzSAzOIpraVn7b3pjiSX1zrJ-3ij-eEqMqScdEofS1FvOn6ISPxZiF8A0gBxvMNiAwqRxW3yNxO840"
    //       }
    //     }
    // }).then(({data}) => {
    //     console.log(data)
    //   })
  },
  computed: {
    attempting () {
      return !this.failedMessage
    }
  },
  methods: {
    commandTalk (){
      console.log("aaaaaaaaa")
      // this.$apollo.mutate({
      //   mutation: UPDATE_USER_GQL,
      //   variables: {
      //     name: "オオオオオン",
      //     feature1: "aaaa1a2a",
      //     description: "領収書発行のお客様あああああああい"
      //   },
      //   context: {
      //     headers: {
      //         "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMxMzNhYTliMDhjYjQ5Mzc2MTU3MzI4ODU2ZDhjYjFlZTQ2MjdmZDcxZGM2YzVmZjU4MmIwMGRjMzcyNmEwZTExODk1NjM4YTcyMjQxNTk0In0.eyJhdWQiOiIxIiwianRpIjoiMzEzM2FhOWIwOGNiNDkzNzYxNTczMjg4NTZkOGNiMWVlNDYyN2ZkNzFkYzZjNWZmNTgyYjAwZGMzNzI2YTBlMTE4OTU2MzhhNzIyNDE1OTQiLCJpYXQiOjE1NjIzMTAzMjIsIm5iZiI6MTU2MjMxMDMyMiwiZXhwIjoxNTkzOTMyNzIyLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.H8REUy29uvoooHA6ggU86VI7iTYZ3pCKexFqUYo6ZJwCUQZo4MpOrHt4X7XAa-PhcnhsvnbomSpkIAyzrFCpc06kPr5t-LzTHaVi9zO6eFjFr_qWgqI9A2vYu4uYZNXdwiEgA10ODN3WvH6zUvucAROCfAtRNC5KXf8kbvsskkB-8VsXKSoEDxKhJ599AEdkwLDL-naUeB3vN0i6ZN8ukNPXmaB1IK8MY-GXKB-0lCOCdmInr7_qdo_--S2dEu7GMHF1fNEVbP_HvHPYBxnP21VfSjexYNSx9B_IkSWJVNs1w2pUGqCCqF-k9u7k7Bskvfk3OgHUPQuB1YWvk38OC-rYsv3blY07zKWf0jgOr4eGhe87-MEetaYqq2tZwrtLfGeBjgC3uaej8Hcq7H9qkw_1HwskulWwZSowtA5i67hfL-ZHOjYQD14HOMq5AO2Tz8wfMRUApucF9088tW_Jh-qI0cZV8qlG6KRQtBUjur5bwfheTRkOtiFzTpalRmbrQbNKtoLNurxQsZ5pgLRBsdX1NKRRzOIDNKxcwDDLOn6ETCYlquOm6UT68hs81GNBUeZQidLwIDI5eIlXeDr8rqJt04S_nrzSAzOIpraVn7b3pjiSX1zrJ-3ij-eEqMqScdEofS1FvOn6ISPxZiF8A0gBxvMNiAwqRxW3yNxO840"
      //     }
      //   }
      // })
    },
  }
}
</script>