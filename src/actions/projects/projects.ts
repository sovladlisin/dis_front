import axios from "axios"
import { title } from "process"
import { Dispatch } from "react"
import { SERVER_URL } from "../../utils"
import { GRAPH_CREATE_NODES } from "../graph/types"
import { PROJECTS_CREATE_PROJECT, PROJECTS_DELETE_PROJECT, PROJECTS_GET_CUSTOM_PAGE, PROJECTS_GET_PROJECT, PROJECTS_GET_PROJECTS, PROJECTS_UPDATE_PROJECT, TProjectDispatchTypes } from "./types"
import { withToken } from "../auth/auth"

export const createProject = (name: string, ontologies_uris: string[], res_ontologies_uris: string) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ name, ontologies_uris, res_ontologies_uris })
    axios.post(SERVER_URL + '/createProject', body).then(res => {
        dispatch({
            type: PROJECTS_CREATE_PROJECT,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const updateProject = (id: number, name: string, selected_classes_uris: string[], res_selected_classes_uris: string[], res_star_classes_uris: string[]) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ id, name, selected_classes_uris, res_selected_classes_uris, res_star_classes_uris })
    axios.post(SERVER_URL + '/updateProject', body).then(res => {
        dispatch({
            type: PROJECTS_UPDATE_PROJECT,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const getProjects = () => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken()
    axios.get(SERVER_URL + '/getProjects', params).then(res => {
        dispatch({
            type: PROJECTS_GET_PROJECTS,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const getProject = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })
    axios.get(SERVER_URL + '/getProject', params).then(res => {
        dispatch({
            type: PROJECTS_GET_PROJECT,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const deleteProject = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })
    axios.delete(SERVER_URL + '/deleteProject', params).then(res => {
        dispatch({
            type: PROJECTS_DELETE_PROJECT,
            payload: id
        })
    }).catch((err) => {

    })
}


export const getCustomPage = (class_uri: string, ontology_uri: string) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ class_uri, ontology_uri })
    axios.get(SERVER_URL + '/getCustomPage', params).then(res => {
        dispatch({
            type: PROJECTS_GET_CUSTOM_PAGE,
            payload: res.data
        })
    }).catch((err) => {

    })
}

