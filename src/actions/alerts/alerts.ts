import { Dispatch } from "react";
import { alertDispatchTypes, CLEAR_ALERTS, CREATE_ALERT, TAlert } from "./types";

export const createAlert = (alert: TAlert) => (dispatch: Dispatch<alertDispatchTypes>) => {
    dispatch({
        type: CREATE_ALERT,
        payload: alert
    })
}

export const clearAlerts = () => (dispatch: Dispatch<alertDispatchTypes>) => {
    dispatch({
        type: CLEAR_ALERTS
    })
}