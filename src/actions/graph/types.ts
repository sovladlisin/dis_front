import { COMMENT, LABEL } from "../../utils"

export const GRAPH_GET_GRAPH = 'GRAPH_GET_GRAPH'
export const GRAPH_IS_LOADING = 'GRAPH_IS_LOADING'

export const GRAPH_CREATE_NODES = 'GRAPH_CREATE_NODES'
export const GRAPH_REMOVE_NODES = 'GRAPH_REMOVE_NODES'
export const GRAPH_UPDATE_NODES = 'GRAPH_UPDATE_NODES'

export const GRAPH_TOGGLE_NODE = 'GRAPH_TOGGLE_NODE'
export const GRAPH_HIGHLIGHT_NODE = 'GRAPH_HIGHLIGHT_NODE'

export const GRAPH_SAVE_PATTERN = 'GRAPH_SAVE_PATTERN'
export const GRAPH_DELETE_PATTERN = 'GRAPH_DELETE_PATTERN'
export const GRAPH_SET_PATTERNS = 'GRAPH_SET_PATTERNS'

export const GRAPH_GET_CLASS_OBJECTS = 'GRAPH_GET_CLASS_OBJECTS'

export const GRAPH_UPDATE_SELECTION = 'GRAPH_UPDATE_SELECTION'




export type TNode = {
    id: string,
    position: { x: number, y: number },
    type: string,
    data: TNodeData,
    draggable: boolean,
}

export type TNodeData = {
    id: number,
    labels: string[],
    params: string[],
    [LABEL]: string[],
    uri: string,
    ontology_uri: string,

    params_values: { [field: string]: any }

    onToggle?: (uri: string) => void,
    onCreateSubClass?: (parent_uri: string) => void,
    onCreateObject?: (class_uri: string) => void,
    onDelete?: (uri: string) => void,
    onApplyPattern?: (node: TNode, pattern: TPattern) => void,
    onEdit?: (uri: string) => void,
    onOpenEntity?: (ontology_uri: string, uri: string) => void,
    onNodeConnect?: (source: string, target: string) => void,
    is_toggled: boolean,
    toggled_data: string[],

    is_highlighted: boolean,

    attributes: TNode[],
    obj_attributes: TObjectTypeAttribute[],


}

export type TObjectTypeAttribute = {
    field: TNode,
    range: TNode,
    value?: TNode,
    relation?: TArc
    direction: 0 | 1
}

export type TArc = {
    id: string,
    source: string,
    target: string,
    type: string,
    data: TNodeData,
    markerEnd: any,
    animated: boolean
}

export type TPattern = {
    id: number,
    name: string,
    ontology_uri: string,
    nodes?: TPatternNode[],
    arcs?: TPatternArc[],
    target_query?: string,
    target_nodes?: TNode[]
}


export type TPatternNode = {
    id: string,
    type: 'mainPatternNode',
    position: { x: number, y: number },
    data: {
        is_main: boolean,
        is_main_uri?: string, //form

        is_create: boolean,
        is_create_label?: string[], //form

        is_select: boolean,
        is_select_node?: TNode, //form

        is_const: boolean,
        is_const_node?: TNode,
        is_const_general?: boolean,
        is_const_filter?: boolean,

        field_name?: string[],

        tag: string // bubble,
    }
}

export type TPatternArc = {
    id: string,
    type?: string,
    source: string,
    target: string,
    label: string,
    markerEnd: any
}

interface IUploadNodes {
    type: typeof GRAPH_GET_GRAPH | typeof GRAPH_CREATE_NODES | typeof GRAPH_UPDATE_NODES
    payload: { nodes: TNode[], arcs?: TArc[], arc_names?: TNode[] }
}
interface IRemoveNodes {
    type: typeof GRAPH_REMOVE_NODES
    payload: { nodes: string[], arcs: number[] }
}

interface IUpdateSelection {
    type: typeof GRAPH_UPDATE_SELECTION,
    payload: { nodes: TNode[], arcs: TArc[] }
}

interface Loading {
    type: typeof GRAPH_IS_LOADING,
    payload: boolean
}
interface IToggleNode {
    type: typeof GRAPH_TOGGLE_NODE,
    payload: string
}
interface IHighlightNode {
    type: typeof GRAPH_HIGHLIGHT_NODE,
    payload: string
}
interface IGraphSavePattern {
    type: typeof GRAPH_SAVE_PATTERN,
    payload: TPattern
}
interface IGraphDeletePattern {
    type: typeof GRAPH_DELETE_PATTERN,
    payload: number
}
interface ISetPatternItems {
    type: typeof GRAPH_SET_PATTERNS,
    payload: TPattern[]
}

interface getNodes {
    type: typeof GRAPH_GET_CLASS_OBJECTS,
    payload: TNode[]
}

export type TGraphDispatchTypes = IUpdateSelection | getNodes | ISetPatternItems | IUploadNodes | Loading | IRemoveNodes | IToggleNode | IHighlightNode | IGraphSavePattern | IGraphDeletePattern