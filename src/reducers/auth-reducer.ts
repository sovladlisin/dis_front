import { AUTH_LOGIN, AUTH_LOGOUT, TAccount, TAuthDispatchTypes } from "../actions/auth/types"

interface IDefaultState {
    account: TAccount,
}

const defaultState: IDefaultState = {
    account: null,
}

export const authReducer = (state: IDefaultState = defaultState, action: TAuthDispatchTypes) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                account: action.payload
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                account: null
            }

        default:
            return state
    }
}

