import { TNode } from "../graph/types"

export const PROJECTS_GET_PROJECTS = 'PROJECTS_GET_PROJECTS'
export const PROJECTS_GET_PROJECT = 'PROJECTS_GET_PROJECT'
export const PROJECTS_DELETE_PROJECT = 'PROJECTS_DELETE_PROJECT'
export const PROJECTS_UPDATE_PROJECT = 'PROJECTS_UPDATE_PROJECT'
export const PROJECTS_CREATE_PROJECT = 'PROJECTS_CREATE_PROJECT'

export const PROJECTS_GET_CUSTOM_PAGE = 'PROJECTS_GET_CUSTOM_PAGE'


export type TProject = {
    name: string,
    id: number,
    ontologies_uris: string[],
    res_ontologies_uris: string,
    selected_classes_uris: string[],
    res_selected_classes_uris: string[],
    res_star_classes_uris: string[],

    resource_star_items?: TNode[],
    resource_gallery_items?: TNode[]
}

interface IProjectIn {
    type: typeof PROJECTS_CREATE_PROJECT | typeof PROJECTS_UPDATE_PROJECT | typeof PROJECTS_GET_PROJECT
    payload: TProject
}
interface IProjectsIn {
    type: typeof PROJECTS_GET_PROJECTS,
    payload: TProject[]
}
interface IProjectOut {
    type: typeof PROJECTS_DELETE_PROJECT,
    payload: number
}
interface IGetCustomPage {
    type: typeof PROJECTS_GET_CUSTOM_PAGE,
    payload: { class_node: TNode, object_nodes: TNode[] }
}

export type TProjectDispatchTypes = IProjectIn | IProjectOut | IProjectsIn | IGetCustomPage