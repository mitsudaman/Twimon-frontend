
import GET_ME_GQL from '~/apollo/queries/getMe.gql'
const inBrowser = typeof window !== 'undefined'

export const state = () => ({
  user: null,
  isLoggedIn: false,
  twimonToken: null
})

export const mutations = {
  setUser (state, { user }) {
    state.user = user
    state.isLoggedIn = Boolean(user)
  },
  setToken (state, { token }) {
    state.twimonToken = token

    if (inBrowser) {
      if (token) {
        this.$cookies.set('twimonToken', token, {
            maxAge: 60 * 60 * 24 * 7
          })
      } else {
        this.$cookies.remove('twimonToken')
      }
    }
  },
  logOut (state) {
    state.twimonToken = null
    state.user = null
    state.isLoggedIn = false
    this.$cookies.remove('twimonToken')
  }
}

export const actions = {
  nuxtClientInit({ commit }, context) {
    const token = this.$cookies.get('twimonToken')
    if (!token) {
      return Promise.resolve()
    }
    const client = this.app.apolloProvider.defaultClient
    client.query({
        query: GET_ME_GQL,
      }).then(({data}) => {
          const me = data.me
          commit('setUser',  { user: data.me})
      })
  },
}