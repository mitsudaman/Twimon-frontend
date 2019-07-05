<template>
  <div>
    {{ info }}
  </div>
</template>


<script>
  export default {
    data () {
      return {
        info: null
      }
    },
    mounted () {
      const axios = require('axios');
      // axios
      //   .get('http://localhost:8001/oauth/scopes')
      //   .then(response => (this.info = response))

      axios.get('/oauth/scopes').then(response => {
          console.log(response.data);
      });
    }
  }
</script>