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
    <v-btn
      :block=true
      :large=true
      @click="updateLike"
      color="grey darken-3 white--text">
      <span><i class="far fa-comment-dots"></i> いいね</span>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AUTHENTICATE_USER_GQL from '~/apollo/mutations/authenticateUserGql.gql'
import UPDATE_USER_PROF_GQL from '~/apollo/mutations/updateUserProf.gql'
import ADD_OR_DELETE_LIKE_UAER_GQL from '~/apollo/mutations/addOrDeleteLikeUser.gql'
import GET_AUTHED_USER_GQL from '~/apollo/queries/getAuthedUser.gql'

export default {
  // middleware: 'guest',

  data () {
    return {
      failedMessage: null
    }
  },
  created (){
    // this.$apollo.mutate({
    //     mutation: AUTHENTICATE_USER_GQL, 
    //   })
    //   .then(({data}) => { 
    //     // Query work fine and result is the proper data object
    //     // console.log(data.authenticateUserGql.access_token)
    //     this.$store.commit('setToken',{ token: data.authenticateUserGql.access_token})
    //     this.$store.commit('setUser',{ user: data.authenticateUserGql.me})
    //     // this.$router.replace('/');
    //   })
    //   .catch((error) => {
    //     // This should log the error object but is just printing out the message
    //     console.log(error);
    //     this.failedMessage = 'Twitterでのログインに失敗しました。';
    //   });

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
  async mounted () {
    try{
      console.log(this.$route.query)
      const axios = require('axios');
      const callbackData = await axios.get('http://localhost:8001/api/login/twitter/callback', { params: this.$route.query })

      console.log(callbackData)
    }catch (error) {
      console.log(error)
      console.log(error.message)
    }
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
    updateLike(){
      this.$apollo.mutate({
        mutation: ADD_OR_DELETE_LIKE_UAER_GQL,
        variables: {
          user_id: 1
        },
        context: {
          headers: {
              "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRmZjJmMTVhZGI1NDgxNjc5NmNkN2M5ODJiMjM5N2RmZjk0ODgyMDg1M2YzNzMyZTUyNjU4NWM5MjMzMTk4N2Y0N2Q0MjE2ZGM5YTc5Yjg0In0.eyJhdWQiOiIxIiwianRpIjoiZGZmMmYxNWFkYjU0ODE2Nzk2Y2Q3Yzk4MmIyMzk3ZGZmOTQ4ODIwODUzZjM3MzJlNTI2NTg1YzkyMzMxOTg3ZjQ3ZDQyMTZkYzlhNzliODQiLCJpYXQiOjE1NjI3NDIzMzAsIm5iZiI6MTU2Mjc0MjMzMCwiZXhwIjoxNTk0MzY0NzMwLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.dWyHR6y6h5UyZiQICef-GCRL1Yi0fA4CVrfsesEQSY78tW8a-aXC3WpBUls4TdZibzyYzjVR-o75N2KyGu-o5vE6FBZmQ3W15EVAYF9h7PiHqJ5umpsYiViJHjiCOeqAbiME43Lo_9DV3AY5UoiiS8Y2Ewc3Y6yv0--alKTS8VY0zCVVt5GCVEQ40GUhxWThszJvqnYSJ6gpShtT3Q7YnPMwO63bGuw91Pc1KIPCkwn9z9jh2G0Nf_6esHvNwzdD0z-OTRCAJiwIdtWlP5o69pD-bOGRiZDL9A3iQ25ZZ3wBHhoEGv685_9QIiYyKhqZa0hSi7qkAxi6Rq_C0mvREfiBZOmRtRfrRZnY04I-eQrkqPGm-XrqEYEwRq3wqaWBh0952UjdAZ08waGqj-2d0sqgi5q9fNNO6PEJD84BtEIgeHkavwqsuakCaTW_gPu5Vnizvc-fRZ31ED421AZuKF9EqXv1K6hzSVZEufv-cLgQrPSu-pFYr_TzL-aUXazk3Hmof1sYJEViDSohKw1nrRRYtxzzAbZw9FxGyO_e-oIh4XQCM-FJTLd8EBDOSVgkM4E5xFGLP2JvrSdkchfNyMbX6vZNLRA_hf8kLXx8jrCRcUZLbMu0vfKx6665d8pQhXK5K99gfw32dVwJ4dKBaVrhDS2KiDlE4dhwP3LfQ2M"
          }
        }
      })
    }
  }
}
</script>