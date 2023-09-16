import { Dispatch } from "react";
import { SETTINGS_SET_SETTINGS, TSettings, TSettingsDispatchTypes } from "./types";

export const setSettings = (settings: TSettings) => (dispatch: Dispatch<TSettingsDispatchTypes>) => {
    dispatch({
        type: SETTINGS_SET_SETTINGS,
        payload: settings
    })
}
