import { Dispatch } from "react"
import { GRAPH_CREATE_NODES, GRAPH_DELETE_PATTERN, GRAPH_GET_GRAPH, GRAPH_HIGHLIGHT_NODE, GRAPH_IS_LOADING, GRAPH_REMOVE_NODES, GRAPH_SAVE_PATTERN, GRAPH_SET_PATTERNS, GRAPH_TOGGLE_NODE, GRAPH_UPDATE_NODES, GRAPH_UPDATE_SELECTION, TArc, TGraphDispatchTypes, TNode, TPattern } from "./types"
import axios from 'axios'
import { SERVER_URL } from "../../utils"
import { withToken } from "../auth/auth"
import { FILES_UPDATE_FILE, TFileDispatchTypes } from "../files/types"


export const getGraph = (uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    dispatch({
        type: GRAPH_IS_LOADING,
        payload: true
    })

    const params = withToken({ uri })

    axios.get(SERVER_URL + '/getGraph', params).then(res => {
        dispatch({
            type: GRAPH_GET_GRAPH,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs, arc_names: res.data.arc_names }
        })
        dispatch({
            type: GRAPH_IS_LOADING,
            payload: false
        })
    }).catch((err) => {
        dispatch({
            type: GRAPH_IS_LOADING,
            payload: false
        })
    })
}

export const applyOntologyPattern = (ontology_uri: string, origin_ontology_uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    dispatch({
        type: GRAPH_IS_LOADING,
        payload: true
    })

    const params = withToken({})
    const body = JSON.stringify({ ontology_uri, origin_ontology_uri })
    axios.post(SERVER_URL + '/applyOntologyPattern', body, params).then(res => {
        dispatch({
            type: GRAPH_GET_GRAPH,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs, arc_names: res.data.arc_names }
        })
        dispatch({
            type: GRAPH_IS_LOADING,
            payload: false
        })
    }).catch((err) => {
        dispatch({
            type: GRAPH_IS_LOADING,
            payload: false
        })
    })
}

export const createClass = (ontology_uri: string, title: string[], comment: string, parent_uri?: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, title, comment, parent_uri })
    axios.post(SERVER_URL + '/createClass', body).then(res => {
        dispatch({
            type: GRAPH_CREATE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}

export const createObject = (ontology_uri: string, title: string[], comment: string, class_uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, title, comment, class_uri })
    axios.post(SERVER_URL + '/createObject', body).then(res => {
        dispatch({
            type: GRAPH_CREATE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}

export const applyPattern = (pattern: TPattern) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const body = JSON.stringify({ pattern })
    axios.post(SERVER_URL + '/applyPattern', body).then(res => {
        dispatch({
            type: GRAPH_CREATE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}

export const collectPatterns = (patterns: TPattern[]) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const body = JSON.stringify({ patterns })
    axios.post(SERVER_URL + '/collectPatterns', body).then(res => {
        console.log('taht', res.data)
        dispatch({
            type: GRAPH_SET_PATTERNS,
            payload: res.data
        })
    }).catch((err) => {

    })
}

export const addClassAttribute = (ontology_uri: string, uri: string, label: string[]) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, uri, label })
    axios.post(SERVER_URL + '/addClassAttribute', body).then(res => {
        dispatch({
            type: GRAPH_CREATE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}
export const addClassObjectAttribute = (ontology_uri: string, uri: string, label: string[], range_uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, uri, label, range_uri })
    axios.post(SERVER_URL + '/addClassObjectAttribute', body).then(res => {
        dispatch({
            type: GRAPH_CREATE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}

export const updateEntity = (ontology_uri: string, uri: string, params: any, obj_params: any) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    console.log(obj_params)
    const body = JSON.stringify({ ontology_uri, uri, params, obj_params })
    axios.post(SERVER_URL + '/updateEntity', body).then(res => {
        dispatch({
            type: GRAPH_UPDATE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}

export const deleteEntity = (ontology_uri: string, uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const params = withToken({ ontology_uri, uri })
    axios.delete(SERVER_URL + '/deleteEntity', params).then(res => {
        dispatch({
            type: GRAPH_REMOVE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}

export const deleteRelation = (ontology_uri: string, id: number) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const params = withToken({ ontology_uri, id })
    axios.delete(SERVER_URL + '/deleteRelation', params).then(res => {
        dispatch({
            type: GRAPH_REMOVE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}

export const getClassObjects = (ontology_uri: string, class_uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const params = withToken({ ontology_uri, class_uri })
    axios.delete(SERVER_URL + '/getClassObjects', params).then(res => {
        dispatch({
            type: GRAPH_REMOVE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
    }).catch((err) => {

    })
}


export const toggleNode = (uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    dispatch({
        type: GRAPH_TOGGLE_NODE,
        payload: uri
    })
}

export const savePattern = (pattern: TPattern) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    dispatch({
        type: GRAPH_SAVE_PATTERN,
        payload: pattern
    })
}
export const deletePattern = (id: number) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    dispatch({
        type: GRAPH_DELETE_PATTERN,
        payload: id
    })
}

export const highlightNode = (uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    dispatch({
        type: GRAPH_HIGHLIGHT_NODE,
        payload: uri
    })
}

export const updateEntityFile = (ontology_uri: string, uri: string, property_uri: any, file_id: number) => (dispatch: Dispatch<TGraphDispatchTypes | TFileDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, uri, property_uri, file_id })
    axios.post(SERVER_URL + '/updateEntityFile', body).then(res => {
        dispatch({
            type: GRAPH_UPDATE_NODES,
            payload: { nodes: res.data.nodes, arcs: res.data.arcs }
        })
        dispatch({
            type: FILES_UPDATE_FILE,
            payload: res.data.file_1
        })
        if (res.data.file_2)
            dispatch({
                type: FILES_UPDATE_FILE,
                payload: res.data.file_2
            })
    }).catch((err) => {

    })
}

export const updateGraphSelection = (nodes: TNode[], arcs: TArc[]) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    dispatch({
        type: GRAPH_UPDATE_SELECTION,
        payload: { nodes, arcs }
    })
}


export const createRelation = (source: string, target: string, ontology_uri: string) => (dispatch: Dispatch<TGraphDispatchTypes>) => {
    const body = JSON.stringify({ ontology_uri, target, source })

    axios.post(SERVER_URL + '/createRelation', body).then(res => {


    })

}
