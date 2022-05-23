import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
      'token': getToken()
    },

    mutations = {
      'SET_TOKEN': (state, token) => {
        state.token = token
      }
    },

    actions = {
      // 登录
      login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
          // login(userInfo.user_name,userInfo.password).then(response => {
          //   const { data } = response
          //   commit('SET_TOKEN', data.access_token)
          //   setToken(data.access_token)
          //   resolve()
          // }).catch(error => {
          //   reject(error)
          // })
        })
      },

      // 前端 登出
      resetToken({ commit }) {
        return new Promise(resolve => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        })
      }
    }

export default {
  'namespaced': true,
  state,
  mutations,
  actions
}

