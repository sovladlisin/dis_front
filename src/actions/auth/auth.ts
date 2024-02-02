import { Dispatch } from "react"
import { AUTH_LOGIN, AUTH_LOGOUT, TAccount, TAuthDispatchTypes } from "./types"
import axios from "axios"
import { HOST, SERVER_URL } from "../../utils"
import store from "../../store"

export const withToken = (params = {}): {} => {
    // const state = store.getState()
    // const user: TAccount = state['auth']['account']
    // if (user.token.length === 0) return { headers: { Token: '' }, params: params }
    // return { headers: { Authorization: 'Token ' + user.token }, params: params }
    return { params: params }

}

export const login = (vk_id: number, vk_name: string, vk_avatar: string) => (dispatch: Dispatch<TAuthDispatchTypes>) => {
    const body = JSON.stringify({ vk_id, vk_name, vk_avatar })
    console.log('HEEEEEEEEEEEEEEEEEEEEEEEEEEEE5')
    console.log('HEEEEEEEEEEEEEEEEEEEEEEEEEEEE7')

    axios.post(SERVER_URL + 'auth/login', body).then(res => {
        console.log(res.data, 'HEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        console.log(res.data, 'HEEEEEEEEEEEEEEEEEEEEEEEEEEEE2')
        console.log(res.data, 'HEEEEEEEEEEEEEEEEEEEEEEEEEEEE3')
        dispatch({
            type: AUTH_LOGIN,
            payload: res.data
        })

    })

}
export const logout = () => (dispatch: Dispatch<TAuthDispatchTypes>) => {
    dispatch({
        type: AUTH_LOGOUT,
    })
    window.location.replace(HOST + '')


}

