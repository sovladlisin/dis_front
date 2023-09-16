export const withToken = (params = {}): {} => {
    // const state = store.getState()
    // const user: TUser = state['auth']['user']
    // if (user.token.length === 0) return { headers: { Token: '' }, params: params }
    // return { headers: { Authorization: 'Token ' + user.token }, params: params }
    return { params: params }

}

