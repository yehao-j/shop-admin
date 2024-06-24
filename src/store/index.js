import { createStore } from "vuex"
import { getinfo, login } from "@/api/manager"
import { removeToken, setToken } from "@/composables/auth"

const store = createStore({
    state() {
        return {
            user: {},
            isCollapse: false,
            menus: [],
            ruleNames: [],
        };
    },
    mutations: {
        SET_USERINFO(state, user) {
            state.user = user
        },
        // 展开或者缩起侧边
        handleAsideWidth(state) {
            state.isCollapse = !state.isCollapse
        },

        SET_MENUS(state, menus) {
            state.menus = menus
        },
        SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames;
        }
    },
    actions: {
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo()
                .then(res => {
                    commit('SET_USERINFO', res)
                    commit('SET_MENUS', res.menus)
                    commit('SET_RULENAMES', res.ruleNames)
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