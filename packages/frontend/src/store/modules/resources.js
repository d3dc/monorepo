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
    getAll ({ commit }, limit) {
        commit('system/setLoading', true, { root: true })
        
        return new Promise((resolve, reject) => {
            axios.get(`${constants.API_HOST}resource${limit? '?limit='+limit : ''}`).then(res => {
                commit('setResources', res.data)
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
            axios.get(constants.API_HOST + 'resource/' + id).then(res => {
                commit('setResource', res.data)
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
    setResources (state, resources) {
        state.all = resources
    },
    setResource (state, resource) {
        if(state.all.length) {
            // TODO does this change order?
            state.all = state.all.map(t => {
                if(t.id == resource.id) {
                    return resource
                }
                return t
            })
        } else {
            state.all = [resource]
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