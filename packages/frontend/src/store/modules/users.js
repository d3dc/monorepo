import constants from '@/constants'
import axios from 'axios'

// initial state
const state = {
    all: []
}

const getters = {
    one: state => id => state.all.find(v => v.id == id)
}

const actions = {
    getAll ({ commit }) {
        commit('system/setLoading', true, { root: true })
        
        return new Promise((resolve, reject) => {
            axios.get(constants.API_HOST + 'user').then(res => {
                commit('setUsers', res.data)
                resolve(res.data)
                commit('system/setLoading', false, { root: true })
            }).catch(err => {
                reject(err.response.data.error)
                commit('system/setLoading', false, { root: true })
            })
        })
    },
    get ({ commit }, id) {

        commit('system/setLoading', true, { root: true })
        
        return new Promise((resolve, reject) => {
            axios.get(constants.API_HOST + 'user/' + id).then(res => {
                commit('setUser', res.data)
                resolve(res.data)
                commit('system/setLoading', false, { root: true })
            }).catch(err => {
                reject(err.response.data.error)
                commit('system/setLoading', false, { root: true })
            })
        })
    }
}

// mutations
const mutations = {
    setUsers (state, vendors) {
        state.all = vendors
    },
    setUser (state, vendor) {
        if(state.all.length) {
            // TODO does this change order?
            state.all = state.all.map(v => {
                if(v.id == vendor.id) {
                    return vendor
                }
                return v
            })
        } else {
            state.all = [vendor]
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }