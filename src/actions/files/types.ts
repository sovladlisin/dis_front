export const FILES_GET_FILES = 'FILES_GET_FILES'
export const FILES_GET_FILE = 'FILES_GET_FILE'
export const FILES_UPDATE_FILE = 'FILES_UPDATE_FILE'
export const FILES_DELETE_FILE = 'FILES_DELETE_FILE'
export const FILES_UPLOAD_FILE = 'FILES_UPLOAD_FILE'

export type TFile = {
    id: number,
    name: string,
    uris: string[],
    link: string,
    ontology_uri: string
}

interface IFilePayload {
    type: typeof FILES_GET_FILE | typeof FILES_UPDATE_FILE | typeof FILES_UPLOAD_FILE,
    payload: TFile
}
interface IFilesPayload {
    type: typeof FILES_GET_FILES
    payload: TFile[]
}
interface IDeletePayload {
    type: typeof FILES_DELETE_FILE
    payload: number
}

export type TFileDispatchTypes = IFilePayload | IFilesPayload | IDeletePayload