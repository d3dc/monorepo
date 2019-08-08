<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0" :class="{'loading':loading}">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-dark mb-4">
                            <small>Forgot Password</small>
                        </div>
                        <form role="form" @submit.prevent="forgot">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <div class="text-center">
                                <base-button nativeType="submit" type="primary" class="my-4">Reset</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <router-link to="/login" class="text-dark"><small>Return to sign in.</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'forgot',
    data() {
      return {
        model: {
          email: ''
        },
        loading: false
      }
    },
    methods: {
      forgot() {
        this.loading = true
        this.$store.dispatch('system/forgot', this.model).then(message => {
          this.$notify({
              type: 'success',
              message
          })
        }).catch(err => {
          this.$notify({
              type: 'danger',
              message: err
          })
        }).finally(() => (this.loading = false))
      }
    }
  }
</script>
<style>
</style>
