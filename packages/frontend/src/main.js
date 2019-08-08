import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

try {
  const token = JSON.parse(localStorage.getItem('auth')).access_token
  if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
} catch(err){
  // console.log(err)
}

Vue.use(ArgonDashboard)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
