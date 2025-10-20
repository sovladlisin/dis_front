import { GRAPH_CREATE_ARC, GRAPH_CREATE_NODES, GRAPH_DELETE_PATTERN, GRAPH_GET_CLASS_OBJECTS, GRAPH_GET_GRAPH, GRAPH_HIGHLIGHT_NODE, GRAPH_IS_LOADING, GRAPH_REMOVE_NODES, GRAPH_SAVE_ONTOLOGY_LAYOUT, GRAPH_SAVE_PATTERN, GRAPH_SET_PATTERNS, GRAPH_TOGGLE_NODE, GRAPH_UPDATE_NODES, GRAPH_UPDATE_SELECTION, TArc, TGraphDispatchTypes, TNode, TPattern, TSavedNodePosition, TSavedOntologyGraphLayout } from "../actions/graph/types";

interface IDefaultState {
    nodes: TNode[],
    arcs: TArc[],
    patterns: TPattern[],
    is_loading: boolean,

    class_objects: TNode[],

    arc_names: TNode[],

    selection: { nodes: TNode[], arcs: TArc[] },

    saved_positions: TSavedNodePosition[],

    ontologies_layout: TSavedOntologyGraphLayout[]

}

const defaultState: IDefaultState = {
    nodes: [],
    arcs: [],
    patterns: [],
    is_loading: false,

    class_objects: [],

    arc_names: [],

    selection: { nodes: [], arcs: [] },

    saved_positions: [],

    ontologies_layout: [],
}

export const graphReducer = (state: IDefaultState = defaultState, action: TGraphDispatchTypes) => {
    switch (action.type) {

        case GRAPH_SAVE_ONTOLOGY_LAYOUT:
            console.log('GRAPH_SAVE_ONTOLOGY_LAYOUT')
            let ontology_uri = action.payload.ontology_uri
            let nodes = action.payload.nodes
            const found = state.ontologies_layout.find(o => o.ontology_uri === ontology_uri)
            if (!found) {
                return {
                    ...state,
                    ontologies_layout: [action.payload]
                }
            }
            return {
                ...state,
                ontologies_layout: state.ontologies_layout.map(o => o.ontology_uri === ontology_uri ? { ...o, nodes: nodes } : o)
            }

        case GRAPH_UPDATE_SELECTION:
            return {
                ...state,
                selection: action.payload
            }

        case GRAPH_GET_CLASS_OBJECTS:
            return {
                ...state,
                class_objects: action.payload
            }

        case GRAPH_UPDATE_NODES:
            var new_nodes = {}

            action.payload.nodes.map(n => {
                new_nodes[n.data.uri] = n
            })
            return {
                ...state,
                nodes: state.nodes.map(n => Object.keys(new_nodes).includes(n.data.uri) ? new_nodes[n.data.uri] : n),
            }

        case GRAPH_CREATE_ARC:
            return {
                ...state,
                arcs: [...state.arcs, action.payload]
            }

        case GRAPH_SET_PATTERNS:
            return {
                ...state,
                patterns: action.payload
            }

        case GRAPH_DELETE_PATTERN:
            return {
                ...state,
                patterns: state.patterns.filter(p => p.id != action.payload)
            }


        case GRAPH_SAVE_PATTERN:

            var includes = state.patterns.map(p => p.id).includes(action.payload.id)
            var patterns = state.patterns
            patterns = includes ? patterns.map(p => p.id === action.payload.id ? action.payload : p) : [...patterns, action.payload]
            return {
                ...state,
                patterns: patterns
            }


        case GRAPH_HIGHLIGHT_NODE:
            return {
                ...state,
                nodes: state.nodes.map(node => {
                    if (node.data.uri === action.payload)
                        node.data.is_highlighted = true
                    else
                        node.data.is_highlighted = false
                    return node
                })
            }


        case GRAPH_TOGGLE_NODE:
            return {
                ...state,
                nodes: state.nodes.map(node => {
                    if (node.data.uri === action.payload)
                        node.data.is_toggled = !node.data.is_toggled
                    return node
                })
            }


        case GRAPH_REMOVE_NODES:
            return {
                ...state,
                nodes: state.nodes.filter(node => !action.payload.nodes.includes(node.data.uri)),
                arcs: state.arcs.filter(arc => !action.payload.arcs.includes(arc.data.id)),
            }

        case GRAPH_CREATE_NODES:
            return {
                ...state,
                nodes: state.nodes.concat(action.payload.nodes),
                arcs: state.arcs.concat(action.payload.arcs)
            }

        case GRAPH_GET_GRAPH:
            return {
                ...state,
                nodes: action.payload.nodes,
                arcs: action.payload.arcs,
                arc_names: action.payload.arc_names
            }

        case GRAPH_IS_LOADING:
            return {
                ...state,
                is_loading: action.payload
            }
        default:
            return state
    }
}

