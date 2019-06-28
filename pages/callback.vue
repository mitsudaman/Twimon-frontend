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
import HANDLE_TWITTER_CALLBACK from '~/apollo/queries/handleTwitterCallback.gql'

export default {
  // middleware: 'guest',

  data () {
    return {
      failedMessage: null
    }
  },
  created (){
    this.$apollo.query({
        query: HANDLE_TWITTER_CALLBACK, 
      })
      .then(({data}) => { 
        // Query work fine and result is the proper data object
        this.$router.replace('/');
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