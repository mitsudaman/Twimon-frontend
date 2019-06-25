<template>
  <p>Twitterへリダイレクトしています{{getRedirectUrl}}</p>
</template>

<script>
import GET_REDIRECT_URL_GQL from '~/apollo/queries/getRedirectUrl.gql'
export default {
  // middleware: 'guest',

  apollo: {
    getRedirectUrl: {
      query: GET_REDIRECT_URL_GQL,
      update(data){
        window.location.href = data.getRedirectUrl
      }
    },
  },
}
</script>