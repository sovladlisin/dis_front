import axios from "axios"
import { Dispatch } from "react"
import { SERVER_URL } from "../../utils"
import { withToken } from "../auth/auth"
import { ONTOLOGY_COLLECT_ENTITY, ONTOLOGY_COLLECT_ENTITY_LOADING, ONTOLOGY_CREATE_ONTOLOGY, ONTOLOGY_CREATE_PATTERN_ONTOLOGY, ONTOLOGY_CREATE_RESOURCE_ONTOLOGY, ONTOLOGY_DELETE_ONTOLOGY, ONTOLOGY_GET_ITEMS_BY_LABELS, ONTOLOGY_GET_ONTOLOGIES, ONTOLOGY_GET_ONTOLOGY_TREE, ONTOLOGY_GET_PATTERN_ONTOLOGIES, ONTOLOGY_GET_RESOURCE_ONTOLOGIES, ONTOLOGY_OPEN_ENTITY, TOntologyDispatchTypes } from "./types"

export const getOntologies = () => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/getOntologies').then(res => {
        dispatch({
            type: ONTOLOGY_GET_ONTOLOGIES,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const getResourceOntologies = () => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/getResourceOntologies').then(res => {
        dispatch({
            type: ONTOLOGY_GET_RESOURCE_ONTOLOGIES,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const getPatternOntologies = () => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/getPatternOntologies').then(res => {
        dispatch({
            type: ONTOLOGY_GET_PATTERN_ONTOLOGIES,
            payload: res.data
        })
    }).catch((err) => {

    })
}


export const createOntology = (title: string[], comment: string) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    const body = JSON.stringify({ title, comment })
    axios.post(SERVER_URL + 'api/createOntology', body).then(res => {
        dispatch({
            type: ONTOLOGY_CREATE_ONTOLOGY,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const branchOntology = (ontology_uri: string, title: string[], comment: string, ontology_type: 'ResourceOntology' | 'Ontology') => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, title, comment, ontology_type })
    axios.post(SERVER_URL + 'api/branchOntology', body).then(res => {
        dispatch({
            type: ONTOLOGY_CREATE_ONTOLOGY,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const createResourceOntology = (title: string[], comment: string) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    const body = JSON.stringify({ title, comment })
    axios.post(SERVER_URL + 'api/createResourceOntology', body).then(res => {
        dispatch({
            type: ONTOLOGY_CREATE_RESOURCE_ONTOLOGY,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const createPatternOntology = (title: string[], comment: string) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    const body = JSON.stringify({ title, comment })
    axios.post(SERVER_URL + 'api/createPatternOntology', body).then(res => {
        dispatch({
            type: ONTOLOGY_CREATE_PATTERN_ONTOLOGY,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const getItemsByLabels = (ontology_uri: string, labels: string[], custom_q?: string) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, labels, custom_q })
    const params = withToken()

    console.log('GETITEMSBYLABELS')
    axios.post(SERVER_URL + 'api/getItemsByLabels', body, params).then(res => {
        dispatch({
            type: ONTOLOGY_GET_ITEMS_BY_LABELS,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const deleteOntology = (ontology_uri: string) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    const params = withToken({ ontology_uri })
    axios.delete(SERVER_URL + 'api/deleteOntology', params).then(res => {
        dispatch({
            type: ONTOLOGY_DELETE_ONTOLOGY,
            payload: ontology_uri
        })
    }).catch((err) => {

    })
}

export const collectEntity = (ontology_uri: string, uri: string) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    dispatch({
        type: ONTOLOGY_COLLECT_ENTITY_LOADING,
        payload: true
    })
    const params = withToken({ ontology_uri, uri })
    axios.get(SERVER_URL + 'api/collectEntity', params).then(res => {
        console.log(res.data)
        dispatch({
            type: ONTOLOGY_COLLECT_ENTITY,
            payload: res.data
        })
        dispatch({
            type: ONTOLOGY_COLLECT_ENTITY_LOADING,
            payload: false
        })
    }).catch((err) => {
        dispatch({
            type: ONTOLOGY_COLLECT_ENTITY_LOADING,
            payload: false
        })
    })
}


export const openEntity = (en: { ontology_uri: string, uri: string }) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    dispatch({
        type: ONTOLOGY_OPEN_ENTITY,
        payload: en ? { ontology_uri: en.ontology_uri, uri: en.uri } : null
    })
}

export const getOntologyTree = (ontology_uri: string) => (dispatch: Dispatch<TOntologyDispatchTypes>) => {
    const params = withToken({ ontology_uri })
    axios.get(SERVER_URL + 'api/getOntologyTree', params).then(res => {
        dispatch({
            type: ONTOLOGY_GET_ONTOLOGY_TREE,
            payload: res.data
        })
    }).catch((err) => {

    })
}