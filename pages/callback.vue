<template>
  <div>
    <p v-if="attempting">Twitterでログインしています。</p>
    <template v-else>
      <p>{{failedMessage}}</p>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AUTHENTICATE_USER_GQL from '~/apollo/mutations/authenticateUserGql.gql'
import UPDATE_USER_PROF_GQL from '~/apollo/mutations/updateUserProf.gql'
import GET_AUTHED_USER_GQL from '~/apollo/queries/getAuthedUser.gql'
import axios from 'axios';

export default {
  // middleware: 'guest',

  data () {
    return {
      failedMessage: null
    }
  },
  async mounted () {
    try {
        const callbackData = await axios.get('http://localhost:8001/api/login/callback', { 
          params: this.$route.query,
          withCredentials: true
        })
        this.$store.commit('setToken',{ token: callbackData.data.access_token})
        this.$store.commit('setUser',{ user: callbackData.data.me})
        this.$router.replace('/');
    } catch (error) {
      this.failedMessage = error.message
    }
  },
  // created (){
    // this.$apollo.mutate({
    //     mutation: AUTHENTICATE_USER_GQL, 
    //   })
    //   .then(({data}) => { 
    //     // Query work fine and result is the proper data object
    //     // console.log(data.authenticateUserGql.access_token)
    //     this.$store.commit('setToken',{ token: data.authenticateUserGql.access_token})
    //     this.$store.commit('setUser',{ user: data.authenticateUserGql.me})
    //     this.$router.replace('/');
    //   })
    //   .catch((error) => {
    //     // This should log the error object but is just printing out the message
    //     this.failedMessage = 'Twitterでのログインに失敗しました。';
    //   });
  // },
  computed: {
    attempting () {
      return !this.failedMessage
    }
  },
  methods: {
  }
}
</script>