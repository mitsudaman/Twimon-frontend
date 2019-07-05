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
import GET_SOCIAL_AUTHED_USER from '~/apollo/queries/getSocialAuthedUser.gql'

export default {
  // middleware: 'guest',

  data () {
    return {
      failedMessage: null
    }
  },
  created (){
    this.$apollo.query({
        query: GET_SOCIAL_AUTHED_USER, 
      })
      .then(({data}) => { 
        // Query work fine and result is the proper data object
        // this.$router.replace('/');
      })
      .catch((error) => {
        // This should log the error object but is just printing out the message
        // console.log(error);
        this.failedMessage = 'Twitterでのログインに失敗しました。';
      });
  },
  computed: {
    attempting () {
      return !this.failedMessage
    }
  },
  methods: mapMutations([
    'setToken',
    'setUser'
  ]),
}
</script>