import { withToken } from "../auth/auth"
import { CREATE_MARKUP, CREATE_TEXT_ENTITY, CREATE_TEXT_RELATION, DELETE_MARKUP, DELETE_TEXT_ENTITY, DELETE_TEXT_RELATION, EDIT_MARKUP, GET_MARKUPS, GET_NODE_ATTRIBUTES, GET_TEXT_ENTITIES, GET_TEXT_RELATIONS, GET_WORKSPACE, TEntity, TMarkup, TMarkupDispatchTypes, TTextRelation } from "./types"
import axios from "axios";
import { handleError, SERVER_URL } from "../../utils";
import { Dispatch } from "react";
import { alertDispatchTypes, CREATE_ALERT } from "../alerts/types";



//MARKUPs

export const getMarkups = (original_object_uri: string) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ original_object_uri })
    axios.get(SERVER_URL + 'api/getMarkups', params).then(res => {
        dispatch({
            type: GET_MARKUPS,
            payload: { markups: res.data, text_uri: original_object_uri }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const createMarkup = (markup: TMarkup) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/addMarkup', JSON.stringify(markup), params).then(res => {
        dispatch({
            type: CREATE_MARKUP,
            payload: res.data
        })
    }).catch(err => {
    })
}
export const editMarkup = (name: string, id: number) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ id })
    axios.post(SERVER_URL + 'api/editMarkup', JSON.stringify({ name, id }), params).then(res => {
        dispatch({
            type: EDIT_MARKUP,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const deleteMarkup = (id: number) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/deleteMarkup', JSON.stringify({ id }), params).then(res => {
        dispatch({
            type: DELETE_MARKUP,
            payload: id
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

//ENTITIES
export const getTextEntities = (markup_id: number) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ markup_id })
    axios.get(SERVER_URL + 'api/getTextEntities', params).then(res => {
        dispatch({
            type: GET_TEXT_ENTITIES,
            payload: { entities: res.data, markup_id: markup_id }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const createTextEnitity = (entity: TEntity) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/createTextEntity', JSON.stringify(entity), params).then(res => {
        dispatch({
            type: CREATE_TEXT_ENTITY,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const deleteTextEnitity = (id: number) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/deleteTextEntity', JSON.stringify({ id }), params).then(res => {
        dispatch({
            type: DELETE_TEXT_ENTITY,
            payload: id
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}


//RELATIONS

export const getTextRelations = (markup_id: number) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ markup_id })
    axios.get(SERVER_URL + 'api/getTextRelations', params).then(res => {
        dispatch({
            type: GET_TEXT_RELATIONS,
            payload: { relations: res.data, markup_id: markup_id }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const createTextRelation = (rel: TTextRelation) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/createTextRelation', JSON.stringify(rel), params).then(res => {
        dispatch({
            type: CREATE_TEXT_RELATION,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const deleteTextRelation = (id: number) => (dispatch: Dispatch<TMarkupDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'api/deleteTextRelation', JSON.stringify({ id }), params).then(res => {
        dispatch({
            type: DELETE_TEXT_RELATION,
            payload: id
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}