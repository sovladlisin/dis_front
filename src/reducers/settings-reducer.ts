import { SETTINGS_SET_SETTINGS, TSettings, TSettingsDispatchTypes } from "../actions/settings/types"

const defaultState: TSettings = {
    lang: 'ru'
}

export const settingsReducer = (state: TSettings = defaultState, action: TSettingsDispatchTypes) => {
    switch (action.type) {
        case SETTINGS_SET_SETTINGS:
            return action.payload
        default:
            return state
    }
}

