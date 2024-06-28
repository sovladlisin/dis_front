import { TNode } from "../graph/types"
export const GET_WORKSPACE = 'GET_WORKSPACE'

export const GET_MARKUPS = 'GET_MARKUPS'
export const CREATE_MARKUP = 'CREATE_MARKUP'
export const EDIT_MARKUP = 'EDIT_MARKUP'
export const DELETE_MARKUP = 'DELETE_MARKUP'

export const GET_TEXT_ENTITIES = 'GET_TEXT_ENTITIES'
export const CREATE_TEXT_ENTITY = 'CREATE_TEXT_ENTITY'
export const DELETE_TEXT_ENTITY = 'DELETE_TEXT_ENTITY'

export const GET_TEXT_RELATIONS = 'GET_TEXT_RELATIONS'
export const CREATE_TEXT_RELATION = 'CREATE_TEXT_RELATION'
export const DELETE_TEXT_RELATION = 'DELETE_TEXT_RELATION'

export const GET_NODE_ATTRIBUTES = 'GET_NODE_ATTRIBUTES'


export const CONNECT_FILE_TO_TEXT = 'CONNECT_FILE_TO_TEXT'
export const DISCONNECT_FILE_FROM_TEXT = 'DISCONNECT_FILE_FROM_TEXT'

export type TEntity = {
    pos_start: number,
    pos_end: number,
    markup?: number,
    id?: number,
    node_uri: string,
    node?: TNode,
    text_uri?: string,
    markup_object?: TMarkup
}

export type TMarkup = {
    user: { id: number, username: string },
    ontology: TNode,
    name: string,
    id?: number,
    original_object_uri: string,
    ontology_uri: string
}

export type TTextRelation = {
    start: number,
    end: number,
    connection: number,
    markup: number,
    id?: number
}


interface IDisconnectFileFromText {
    type: typeof DISCONNECT_FILE_FROM_TEXT,
    payload: number
}
//MARKUPS
interface IGetMarkups {
    type: typeof GET_MARKUPS,
    payload: { markups: TMarkup[], text_uri: string }
}
interface ICreateMarkup {
    type: typeof CREATE_MARKUP,
    payload: TMarkup
}
interface IEditMarkup {
    type: typeof EDIT_MARKUP,
    payload: TMarkup
}
interface IDeleteMarkup {
    type: typeof DELETE_MARKUP,
    payload: number
}

//entities
interface IGetEntities {
    type: typeof GET_TEXT_ENTITIES,
    payload: { entities: TEntity[], markup_id: number }
}
interface ICreateEntity {
    type: typeof CREATE_TEXT_ENTITY,
    payload: TEntity
}
interface IDeleteEntity {
    type: typeof DELETE_TEXT_ENTITY,
    payload: number
}

//relations
interface IGetTextRelations {
    type: typeof GET_TEXT_RELATIONS,
    payload: { relations: TTextRelation[], markup_id: number }
}
interface ICreateTextRelation {
    type: typeof CREATE_TEXT_RELATION,
    payload: TTextRelation
}
interface IDeleteTextRelation {
    type: typeof DELETE_TEXT_RELATION,
    payload: number
}

export type TMarkupDispatchTypes =
    IGetMarkups | ICreateMarkup | IEditMarkup | IDeleteMarkup |
    IGetEntities | ICreateEntity | IDeleteEntity |
    IDeleteTextRelation | ICreateTextRelation | IGetTextRelations | IDisconnectFileFromText
