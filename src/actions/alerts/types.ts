export const CREATE_ALERT = 'CREATE_ALERT'
export const CLEAR_ALERTS = 'CLEAR_ALERTS'



export type TAlert = {
    message: string,
    type: number
}

export interface TCreateAlert {
    type: typeof CREATE_ALERT
    payload: TAlert
}

export interface TClearAlerts {
    type: typeof CLEAR_ALERTS
}

export type alertDispatchTypes = TCreateAlert | TClearAlerts