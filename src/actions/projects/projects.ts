import axios from "axios"
import { title } from "process"
import { Dispatch } from "react"
import { SERVER_URL } from "../../utils"
import { GRAPH_CREATE_NODES, TNode } from "../graph/types"
import { PROJECTS_CREATE_PAGE, PROJECTS_CREATE_PAGE_BLOCK, PROJECTS_CREATE_PROJECT, PROJECTS_DELETE_PAGE, PROJECTS_DELETE_PAGE_BLOCK, PROJECTS_DELETE_PROJECT, PROJECTS_GET_CUSTOM_PAGE, PROJECTS_GET_PAGE, PROJECTS_GET_PROJECT, PROJECTS_GET_PROJECTS, PROJECTS_PAGE_LOADING, PROJECTS_UPDATE_PAGE, PROJECTS_UPDATE_PAGE_BLOCK, PROJECTS_UPDATE_PROJECT, PROJECT_CHAT_LOADING, PROJECT_GET_PROJECT_EMBEDDING, PROJECT_GET_PROJECT_MESSAGE, PROJECT_SET_MEDIA_BLOCK, TPage, TPageBlock, TProjectDispatchTypes } from "./types"
import { withToken } from "../auth/auth"

export const createProject = (name: string, ontologies_uris: string[], res_ontologies_uris: string) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ name, ontologies_uris, res_ontologies_uris })
    axios.post(SERVER_URL + 'api/createProject', body).then(res => {
        dispatch({
            type: PROJECTS_CREATE_PROJECT,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const updateProject = (id: number, name: string, selected_classes_uris: string[], res_selected_classes_uris: string[], res_star_classes_uris: string[]) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ id, name, selected_classes_uris, res_selected_classes_uris, res_star_classes_uris })
    axios.post(SERVER_URL + 'api/updateProject', body).then(res => {
        dispatch({
            type: PROJECTS_UPDATE_PROJECT,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const getProjects = () => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken()
    axios.get(SERVER_URL + 'api/getProjects', params).then(res => {
        dispatch({
            type: PROJECTS_GET_PROJECTS,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const getProject = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })
    axios.get(SERVER_URL + 'api/getProject', params).then(res => {
        dispatch({
            type: PROJECTS_GET_PROJECT,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const deleteProject = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })
    axios.delete(SERVER_URL + 'api/deleteProject', params).then(res => {
        dispatch({
            type: PROJECTS_DELETE_PROJECT,
            payload: id
        })
    }).catch((err) => {

    })
}


export const getCustomPage = (class_uri: string, ontology_uri: string) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ class_uri, ontology_uri })
    axios.get(SERVER_URL + 'api/getCustomPage', params).then(res => {
        dispatch({
            type: PROJECTS_GET_CUSTOM_PAGE,
            payload: res.data
        })
    }).catch((err) => {

    })
}

// --------------------------------------------- PAGES --------------------------------------------------


export const deletePage = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })
    axios.delete(SERVER_URL + 'api/deletePage', params).then(res => {
        dispatch({
            type: PROJECTS_DELETE_PAGE,
            payload: id
        })
    }).catch((err) => {

    })
}

export const updatePage = (page: TPage) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ params: page })
    axios.post(SERVER_URL + 'api/updatePage', body).then(res => {
        dispatch({
            type: PROJECTS_UPDATE_PAGE,
            payload: res.data
        })
    }).catch((err) => {
    })
}
export const createPage = (page: TPage) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ params: page })
    axios.post(SERVER_URL + 'api/createPage', body).then(res => {
        dispatch({
            type: PROJECTS_CREATE_PAGE,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const getPage = (id) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })

    dispatch({
        type: PROJECTS_PAGE_LOADING,
        payload: true
    })

    axios.get(SERVER_URL + 'api/getPage', params).then(res => {
        dispatch({
            type: PROJECTS_GET_PAGE,
            payload: res.data
        })
        dispatch({
            type: PROJECTS_PAGE_LOADING,
            payload: false
        })
    }).catch((err) => {
        dispatch({
            type: PROJECTS_PAGE_LOADING,
            payload: false
        })
    })
}


// --------------------------------------------- PAGE BLOCKS --------------------------------------------------

export const deletePageBlock = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })
    console.log('delete', id)
    axios.delete(SERVER_URL + 'api/deletePageBlock', params).then(res => {
        dispatch({
            type: PROJECTS_DELETE_PAGE_BLOCK,
            payload: id
        })
    }).catch((err) => {

    })
}

export const updatePageBlock = (page: TPageBlock) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ params: page })
    axios.post(SERVER_URL + 'api/updatePageBlock', body).then(res => {
        dispatch({
            type: PROJECTS_UPDATE_PAGE_BLOCK,
            payload: res.data
        })
    }).catch((err) => {

    })
}
export const createPageBlock = (page: TPageBlock) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ params: page })
    axios.post(SERVER_URL + 'api/createPageBlock', body).then(res => {
        dispatch({
            type: PROJECTS_CREATE_PAGE_BLOCK,
            payload: res.data
        })
    }).catch((err) => {

    })
}

// -----------------------GPT------------------------------------------------------------------------

export const collectProjectEmbeddings = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const body = JSON.stringify({ id })
    axios.post(SERVER_URL + 'api/collectProjectEmbeddings', body).then(res => {
        dispatch({
            type: PROJECT_GET_PROJECT_EMBEDDING,
            payload: {
                id: -1,
                project_id: id,
                is_complete: false,
                is_running: true,
                progress: 0
            }
        })
    }).catch((err) => {
    })
}

export const getProjectEmbedding = (id: number) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id })
    axios.get(SERVER_URL + 'api/getProjectEmbedding', params).then(res => {
        dispatch({
            type: PROJECT_GET_PROJECT_EMBEDDING,
            payload: res.data
        })
    }).catch((err) => {
    })
}

export const getProjectMessage = (id: number, text: string) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    const params = withToken({ id, text })
    dispatch({
        type: PROJECT_CHAT_LOADING,
        payload: true
    })
    axios.get(SERVER_URL + 'api/getProjectMessage', params).then(res => {
        dispatch({
            type: PROJECT_GET_PROJECT_MESSAGE,
            payload: res.data
        })
        dispatch({
            type: PROJECT_CHAT_LOADING,
            payload: false
        })
    }).catch((err) => {
        dispatch({
            type: PROJECT_CHAT_LOADING,
            payload: false
        })
    })
}

export const setMediaBlock = (node: TNode) => (dispatch: Dispatch<TProjectDispatchTypes>) => {
    dispatch({
        type: PROJECT_SET_MEDIA_BLOCK,
        payload: node
    })
}
