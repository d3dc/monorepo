import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system'
import users from './modules/users'
import resources from './modules/resources'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    system,
    users,
    resources
  },
  strict: debug
})