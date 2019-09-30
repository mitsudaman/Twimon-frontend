import GET_ME_GQL from '~/apollo/queries/getMe.gql'

export default function ({app, store, redirect, error}) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    return redirect('/login')
  }
  const client = app.apolloProvider.defaultClient
  client.query({
      query: GET_ME_GQL,
    }).then(({data}) => {
        const me = data.me
        store.commit('setUser',  { user: data.me})
    }).catch(() => {
      return redirect('/login')
    })
}