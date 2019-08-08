<template>
  <div id="app">
    <Loader/>
    <notifications></notifications>
    <router-view/>
  </div>
</template>
<script>
import Loader from '@/components/Loader'

export default {
  components: {
    Loader
  },
  created: function () {
    const self = this;
    self.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          self.$store.dispatch('system/logout')
          self.$router.push('/login')
          self.$notify({
            type: 'danger',
            message: 'Login session expired, please sign in again.'
          })
        }
        reject(err)
      });
    });
  }
}
</script>