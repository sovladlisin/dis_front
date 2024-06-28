import { TNode } from "../actions/graph/types"
import { TMarkup, TEntity, TTextRelation, CONNECT_FILE_TO_TEXT, DISCONNECT_FILE_FROM_TEXT, GET_TEXT_RELATIONS, CREATE_TEXT_RELATION, DELETE_TEXT_RELATION, GET_NODE_ATTRIBUTES, GET_WORKSPACE, GET_MARKUPS, EDIT_MARKUP, CREATE_MARKUP, DELETE_MARKUP, GET_TEXT_ENTITIES, CREATE_TEXT_ENTITY, DELETE_TEXT_ENTITY, TMarkupDispatchTypes } from "../actions/markup/types"

interface IDefaultState {

    textMarkups: { markups: TMarkup[], text_uri: string },
    markupEntities: { markup_id: number, entities: TEntity[] }

    newMarkup: TMarkup,
    newEntity: TEntity,

    selectedAttributes: { node_uri: string, class_node: TNode, attributes: TNode[], attributes_obj: TNode[] },

    textRelations: { markup_id: number, relations: TTextRelation[] },
    newTextRelation: TTextRelation,


}

const defaultState: IDefaultState = {

    textMarkups: null,
    markupEntities: null,

    newMarkup: null,
    newEntity: null,

    selectedAttributes: null,
    textRelations: null,
    newTextRelation: null,

}

export const markupReducer = (state: IDefaultState = defaultState, action: TMarkupDispatchTypes) => {
    switch (action.type) {



        case GET_TEXT_RELATIONS:
            return {
                ...state,
                textRelations: action.payload
            }

        case CREATE_TEXT_RELATION:
            var id = state.textRelations.markup_id

            return {
                ...state,
                newTextRelation: action.payload,
                textRelations: id === action.payload.markup ? { ...state.textRelations, relations: [...state.textRelations.relations, action.payload] } : state.textRelations
            }

        case DELETE_TEXT_RELATION:
            return {
                ...state,
                textRelations: { ...state.textRelations, relations: state.textRelations.relations.filter(r => r.id != action.payload) }
            }


        case GET_MARKUPS:
            return {
                ...state,
                textMarkups: action.payload
            }

        case EDIT_MARKUP:
        case CREATE_MARKUP:
            var uri = state.textMarkups.text_uri

            return {
                ...state,
                newMarkup: action.payload,
                textMarkups: action.payload.original_object_uri === uri ? { ...state.textMarkups, markups: [...state.textMarkups.markups, action.payload] } : state.textMarkups
            }
        case DELETE_MARKUP:
            return {
                ...state,
                textMarkups: { ...state.textMarkups, markups: state.textMarkups.markups.filter(m => m.id != action.payload) }
            }

        case GET_TEXT_ENTITIES:
            return {
                ...state,
                markupEntities: action.payload
            }
        case CREATE_TEXT_ENTITY:
            var id = state.markupEntities.markup_id
            return {
                ...state,
                newEntity: action.payload,
                markupEntities: action.payload.markup === id ? { ...state.markupEntities, entities: [...state.markupEntities.entities, action.payload] } : state.markupEntities
            }

        case DELETE_TEXT_ENTITY:
            return {
                ...state,
                markupEntities: { ...state.markupEntities, entities: state.markupEntities.entities.filter(m => m.id != action.payload) }
            }

        default:
            return state
    }
}
