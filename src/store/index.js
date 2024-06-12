import { createStore } from "vuex"
import { getinfo, login } from "@/api/index"
import { removeToken, setToken } from "@/composables/auth"

const store = createStore({
    state() {
        return {
            user: {},
        };
    },
    mutations: {
        SET_USERINFO(state, user) {
            state.user = user
        },
    },
    actions: {
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo()
                .then(res => {
                    commit('SET_USERINFO', res)
                    resolve(res)
                })
                .catch(err => reject(err))
            })
        },
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password)
                .then(res => {
                    setToken(res.token)

                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        logout({ commit }) {
            removeToken()
            commit('SET_USERINFO', {})
        }
    }
});

export default store