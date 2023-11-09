import { TNode } from "../actions/graph/types"
import { ONTOLOGY_COLLECT_ENTITY, ONTOLOGY_COLLECT_ENTITY_LOADING, ONTOLOGY_CREATE_ONTOLOGY, ONTOLOGY_CREATE_PATTERN_ONTOLOGY, ONTOLOGY_CREATE_RESOURCE_ONTOLOGY, ONTOLOGY_DELETE_ONTOLOGY, ONTOLOGY_GET_ITEMS_BY_LABELS, ONTOLOGY_GET_ONTOLOGIES, ONTOLOGY_GET_PATTERN_ONTOLOGIES, ONTOLOGY_GET_RESOURCE_ONTOLOGIES, ONTOLOGY_OPEN_ENTITY, TOntologyDispatchTypes } from "../actions/ontology/types"

interface IDefaultState {
    ontologies: TNode[],
    resource_ontologies: TNode[],
    pattern_ontologies: TNode[],
    items_by_labels: TNode[],
    collected_entity: TNode,
    collected_entity_loading: boolean,


    opened_entity: { ontology_uri: string, uri: string }
}

const defaultState: IDefaultState = {
    ontologies: [],
    resource_ontologies: [],
    pattern_ontologies: [],
    items_by_labels: [],
    collected_entity: null,
    collected_entity_loading: false,

    opened_entity: null
}

export const ontologyReducer = (state: IDefaultState = defaultState, action: TOntologyDispatchTypes) => {
    switch (action.type) {
        case ONTOLOGY_DELETE_ONTOLOGY:
            return {
                ...state,
                resource_ontologies: state.resource_ontologies.filter(o => o.data.uri != action.payload),
                pattern_ontologies: state.pattern_ontologies.filter(o => o.data.uri != action.payload),
                ontologies: state.ontologies.filter(o => o.data.uri != action.payload),
            }
        case ONTOLOGY_CREATE_PATTERN_ONTOLOGY:
            return {
                ...state,
                pattern_ontologies: [...state.pattern_ontologies, action.payload]
            }
        case ONTOLOGY_GET_PATTERN_ONTOLOGIES:
            return {
                ...state,
                pattern_ontologies: action.payload,
            }
        case ONTOLOGY_OPEN_ENTITY:
            return {
                ...state,
                opened_entity: action.payload
            }

        case ONTOLOGY_COLLECT_ENTITY_LOADING:
            return {
                ...state,
                collected_entity_loading: action.payload
            }
        case ONTOLOGY_COLLECT_ENTITY:
            return {
                ...state,
                collected_entity: action.payload
            }
        case ONTOLOGY_GET_ITEMS_BY_LABELS:
            return {
                ...state,
                items_by_labels: action.payload
            }

        case ONTOLOGY_CREATE_ONTOLOGY:
            return {
                ...state,
                ontologies: [...state.ontologies, action.payload]
            }
        case ONTOLOGY_CREATE_RESOURCE_ONTOLOGY:
            return {
                ...state,
                resource_ontologies: [...state.resource_ontologies, action.payload]
            }

        case ONTOLOGY_GET_ONTOLOGIES:
            return {
                ...state,
                ontologies: action.payload,
            }

        case ONTOLOGY_GET_RESOURCE_ONTOLOGIES:
            return {
                ...state,
                resource_ontologies: action.payload,
            }

        default:
            return state
    }
}

