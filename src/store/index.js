import Vue from 'vue'
import Vuex from 'vuex'
import { getPartners, updatePartner } from "@/api/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        partners: [],
        loading: false,
        error: null
    },

    mutations: {
        SET_LOADING(state, val){
            state.loading = val
        },

        SET_PARTNERS(state, data){
            state.partners = data
        },

        UPDATE_PARTNER(state, updated){
            const index = state.partners.findIndex(a => a.id === updated.id)
            Vue.set(state.partners, index, updated)
        },

        SET_ERROR(state, e){
            state.error = e
        }
    },

    actions: {
        async fetchPartners({ commit }){
            commit('SET_LOADING', true)

            try {
                const res = await getPartners()
                commit('SET_PARTNERS', res.data)
            } catch(e) {
                commit('SET_ERROR', e)
            }

            commit('SET_LOADING', false)
        },

        async updatePartnerData({ commit }, { id, data }){
            const res = await updatePartner(id, data)
            commit('UPDATE_PARTNER', res.data)
        }

    }

})