import axios from "axios"
import { Dispatch } from "react"
import { SERVER_URL } from "../../utils"
import { withToken } from "../auth/auth"
import { FILES_DELETE_FILE, FILES_GET_FILE, FILES_GET_FILES, FILES_UPDATE_FILE, FILES_UPLOAD_FILE, TFileDispatchTypes } from "./types"

export const getFile = (id: number) => (dispatch: Dispatch<TFileDispatchTypes>) => {
    const params = withToken({ id })
    axios.get(SERVER_URL + 'api/getFile', params).then(res => {
        dispatch({
            type: FILES_GET_FILE,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const getFiles = (ontology_uri: string) => (dispatch: Dispatch<TFileDispatchTypes>) => {
    const params = withToken({ ontology_uri })
    axios.get(SERVER_URL + 'api/getFiles', params).then(res => {
        dispatch({
            type: FILES_GET_FILES,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const deleteFile = (id: number) => (dispatch: Dispatch<TFileDispatchTypes>) => {
    const params = withToken({ id })
    axios.get(SERVER_URL + 'api/deleteFile', params).then(res => {
        dispatch({
            type: FILES_DELETE_FILE,
            payload: id
        })
    }).catch((err) => {

    })
}
export const updateFile = (id: number, name: string, uris: string[], ontology_uri: string) => (dispatch: Dispatch<TFileDispatchTypes>) => {
    const params = withToken()
    const body = JSON.stringify({ id, name, uris, ontology_uri })
    axios.post(SERVER_URL + 'api/updateFile', body, params).then(res => {
        dispatch({
            type: FILES_UPDATE_FILE,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const uploadFile = (name: string, file: File, uris: string[], ontology_uri: string) => (dispatch: Dispatch<TFileDispatchTypes>) => {
    var params = withToken()
    params['headers'] = { ...params['headers'], ['Content-Type']: 'multipart/form-data' }

    const body = JSON.stringify({ name, uris, ontology_uri })
    var formData = new FormData();
    formData.append("file", file);
    formData.append('body', body)

    axios.post(SERVER_URL + 'api/uploadFile', formData, params).then(res => {
        dispatch({
            type: FILES_UPLOAD_FILE,
            payload: res.data
        })

    }).catch(err => {

    })
}