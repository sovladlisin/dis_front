import { TArc, TNode } from "../graph/types"

export const ONTOLOGY_GET_ONTOLOGIES = 'ONTOLOGY_GET_ONTOLOGIES'
export const ONTOLOGY_DELETE_ONTOLOGY = 'ONTOLOGY_DELETE_ONTOLOGY'
export const ONTOLOGY_CREATE_ONTOLOGY = 'ONTOLOGY_CREATE_ONTOLOGY'

export const ONTOLOGY_GET_ONTOLOGY_TREE = 'ONTOLOGY_GET_ONTOLOGY_TREE'


export const ONTOLOGY_GET_RESOURCE_ONTOLOGIES = 'ONTOLOGY_GET_RESOURCE_ONTOLOGIES'
export const ONTOLOGY_CREATE_RESOURCE_ONTOLOGY = 'ONTOLOGY_CREATE_RESOURCE_ONTOLOGY'

export const ONTOLOGY_GET_PATTERN_ONTOLOGIES = 'ONTOLOGY_GET_PATTERN_ONTOLOGIES'
export const ONTOLOGY_CREATE_PATTERN_ONTOLOGY = 'ONTOLOGY_CREATE_PATTERN_ONTOLOGY'

export const ONTOLOGY_GET_ITEMS_BY_LABELS = 'ONTOLOGY_GET_ITEMS_BY_LABELS'
export const ONTOLOGY_COLLECT_ENTITY = 'ONTOLOGY_COLLECT_ENTITY'
export const ONTOLOGY_COLLECT_ENTITY_LOADING = 'ONTOLOGY_COLLECT_ENTITY_LOADING'

export const ONTOLOGY_OPEN_ENTITY = 'ONTOLOGY_OPEN_ENTITY'





interface IGetOntologies {
    type: typeof ONTOLOGY_GET_ONTOLOGIES | typeof ONTOLOGY_GET_RESOURCE_ONTOLOGIES | typeof ONTOLOGY_GET_PATTERN_ONTOLOGIES
    payload: TNode[]
}
interface ICreateOntology {
    type: typeof ONTOLOGY_CREATE_ONTOLOGY | typeof ONTOLOGY_CREATE_RESOURCE_ONTOLOGY | typeof ONTOLOGY_CREATE_PATTERN_ONTOLOGY
    payload: TNode
}
interface IGetItemsByLabels {
    type: typeof ONTOLOGY_GET_ITEMS_BY_LABELS,
    payload: TNode[]
}
interface IDeleteOntology {
    type: typeof ONTOLOGY_DELETE_ONTOLOGY,
    payload: string
}

interface ICollectEntity {
    type: typeof ONTOLOGY_COLLECT_ENTITY,
    payload: TNode
}

interface IOpenEntity {
    type: typeof ONTOLOGY_OPEN_ENTITY,
    payload: { ontology_uri: string, uri: string }
}

interface ILoading {
    type: typeof ONTOLOGY_COLLECT_ENTITY_LOADING,
    payload: boolean
}

interface IGetOntologyTree {
    type: typeof ONTOLOGY_GET_ONTOLOGY_TREE,
    payload: { nodes: TNode[], arcs: TArc[], ontology_uri: string }
}

export type TOntologyDispatchTypes = IGetOntologyTree | IDeleteOntology | IGetOntologies | ICreateOntology | IGetItemsByLabels | ICollectEntity | ILoading | IOpenEntity