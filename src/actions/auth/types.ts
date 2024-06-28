export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export type TAccount = {
    id: number,
    vk_id: number,
    vk_name: string,
    vk_avatar: string,
    token?: string
}

interface IAccount {
    type: typeof AUTH_LOGIN,
    payload: TAccount
}
interface INull {
    type: typeof AUTH_LOGOUT,
}

export type TAuthDispatchTypes = IAccount | INull