/* eslint-disable no-console */
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import constants from '@/constants'

// TODO switch to cookie

// initial state
const state = {
  loading: false,
  auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null
}

// getters
const getters = {
  isLoading(state) {
    return state.loading
  },
  decodedAuth(state) {
    return jwtDecode(state.auth.access_token)
  },
  isLoggedIn(state) {
    return (state.auth && state.auth.access_token) ? true : false
  },
  isAdmin(state) {
    const decoded = state.auth ? jwtDecode(state.auth.access_token) : null
    return (decoded && decoded.role === 'admin')
  }
}

// actions
const actions = {
  authenticate ({ commit }, params) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post(constants.API_HOST + 'auth/login', params).then(res => {
        localStorage.setItem('auth', JSON.stringify(res.data))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
        commit('setAuth', res.data);
        resolve(res.data)
        commit('setLoading', false);
      }).catch(err => {
        localStorage.removeItem('auth')
        reject(err.response.data.error)
        commit('setLoading', false);
      })
    })
  },
  
  logout({commit}){
    return new Promise((resolve) => {
      commit('setAuth', null)
      localStorage.removeItem('auth')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },

  forgot ({ commit }, params) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      axios.post(constants.API_HOST + '/forgot', params).then(res => {
        commit('setLoading', false);
        resolve(res.data.message)
      }).catch(err => {
        commit('setLoading', false);
        // TODO can only be email error?
        if(err.response.data.errors) {
          reject(err.response.data.errors.email[0])
        } else {
          reject(err.response.data.message)
        }
      })
    })
  }
  
  // TODO reset w/token

}

// mutations
const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}