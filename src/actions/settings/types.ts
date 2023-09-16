export const SETTINGS_SET_SETTINGS = 'SETTINGS_SET_SETTINGS'
export type TSettings = {
    lang: 'ru' | 'eng',
}

interface ISetSettings {
    type: typeof SETTINGS_SET_SETTINGS,
    payload: TSettings
}

export const LANGUAGES = {
    ru: 'Русский',
    en: 'Английский',
}

export const DEFAULT_LABEL = ['Название@ru', 'Name@en']

export type TSettingsDispatchTypes = ISetSettings
