<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0" :class="{'loading' : loading}">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-dark mb-4">
                            <small>Sign in</small>
                        </div>
                        <form role="form" @submit.prevent="login">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Username"
                                        addon-left-icon="fas fa-user"
                                        v-model="model.username">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>
                            
                            <div class="text-center">
                                <base-button type="primary" nativeType="submit" class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <router-link to="/forgot" class="text-dark"><small>Forgot password?</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        model: {
          username: '',
          password: ''
        },
        loading: false
      }
    },

    methods: {
        login() {
            this.loading = true
            this.$store.dispatch('system/authenticate', this.model).then(auth => {
                this.$router.push('/dashboard')
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
