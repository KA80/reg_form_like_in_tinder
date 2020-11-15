import Vue from 'vue'
import Vuex from 'vuex'
import { User } from "@/api/users";
import {
    ADD_USER,
    REMOVE_USER,
    SET_USERS
} from "@/store/mutation-types";

Vue.use(Vuex)

const state = {
    users: []
}

const getters = {
    users: state => state.users
}

const mutations = {
    [ADD_USER] (state, user) {
        state.users = [user, ...state.users]
    },
    [REMOVE_USER] (state, { id }) {
        state.users = state.users.filter(user => {
            return user.id !== id
        })
    },
    [SET_USERS] (state, { users }) {
        state.users = users
    }
}

const actions = {
    createUser ({ commit }, userData) {
        User.create(userData).then(user => {
            commit(ADD_USER, user)
        })
    },
    deleteUser ({ commit }, user) {
        User.delete(user).then(response => {
            commit(REMOVE_USER, user)
            return response
        })
    },
    getUsers ({ commit }) {
        User.list().then(users => {
            commit(SET_USERS, { users })
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})