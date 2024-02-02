import { TArc, TNode } from "../graph/types"

export const PROJECTS_GET_PROJECTS = 'PROJECTS_GET_PROJECTS'
export const PROJECTS_GET_PROJECT = 'PROJECTS_GET_PROJECT'
export const PROJECTS_DELETE_PROJECT = 'PROJECTS_DELETE_PROJECT'
export const PROJECTS_UPDATE_PROJECT = 'PROJECTS_UPDATE_PROJECT'
export const PROJECTS_CREATE_PROJECT = 'PROJECTS_CREATE_PROJECT'

export const PROJECTS_GET_CUSTOM_PAGE = 'PROJECTS_GET_CUSTOM_PAGE'


export const PROJECTS_CREATE_PAGE = 'PROJECTS_CREATE_PAGE'
export const PROJECTS_UPDATE_PAGE = 'PROJECTS_UPDATE_PAGE'
export const PROJECTS_DELETE_PAGE = 'PROJECTS_DELETE_PAGE'
export const PROJECTS_GET_PAGE = 'PROJECTS_GET_PAGE'


export const PROJECTS_CREATE_PAGE_BLOCK = 'PROJECTS_CREATE_PAGE_BLOCK'
export const PROJECTS_UPDATE_PAGE_BLOCK = 'PROJECTS_UPDATE_PAGE_BLOCK'
export const PROJECTS_DELETE_PAGE_BLOCK = 'PROJECTS_DELETE_PAGE_BLOCK'
export const PROJECTS_PAGE_LOADING = 'PROJECTS_PAGE_LOADING'

export const PROJECT_GET_PROJECT_EMBEDDING = 'PROJECT_GET_PROJECT_EMBEDDING'
export const PROJECT_GET_PROJECT_MESSAGE = 'PROJECT_GET_PROJECT_MESSAGE'
export const PROJECT_CHAT_LOADING = 'PROJECT_CHAT_LOADING'

export const PageBlockTypes = {
    'text': 'Текст',
    'card_list': 'Мозайка',
    'bullet_list': 'Список',
    'media': 'Изображение',
    'media_slide_show': 'Слайд-шоу'
}

export type TProjectEmbedding = {
    id: number,
    project_id: number,
    is_complete: boolean,
    is_running: boolean,
    progress: number
}


export type TPageBlock = {
    page_id: number,
    id?: number,
    block_type: 'text' | 'card_list' | 'bullet_list' | 'media' | 'media_slide_show',
    list_uri?: '',
    x: number,
    y: number,
    h: number,
    w: number,
    data?: {
        // picture
        picture_data?: string,


        // text
        text?: string,
        font_size?: number,
        font_weight?: boolean,

        //ontology selectors ------------

        ontology_uri?: string,

        // card_list / bullet list
        class_uri?: string,
        class_attributes?: string[],

        // ontology_display





    },

    data_nodes?: {
        nodes: TNode[],
        arcs: TArc[]
    }
}

export type TPage = {
    id?: number,
    project_id: number,
    name: string,
    blocks: TPageBlock[],
    data?: {},
}

export type TProject = {
    name: string,
    id?: number,
    pages: TPage[],
    ontologies_uris: string[],
    res_ontologies_uris: string,

    ontologies_nodes?: TNode[],
    res_ontology_node?: TNode,



    selected_classes_uris: string[],
    res_selected_classes_uris: string[],
    res_star_classes_uris: string[],

    resource_star_items?: TNode[],
    resource_gallery_items?: TNode[]
}

export type TProjectMessage = {
    message: string,
    nodes: TNode[],
    role: 'assistant' | 'user',
    project_id: number
}

interface IProjectMessage {
    type: typeof PROJECT_GET_PROJECT_MESSAGE
    payload: TProjectMessage

}

interface IProjectIn {
    type: typeof PROJECTS_CREATE_PROJECT | typeof PROJECTS_UPDATE_PROJECT | typeof PROJECTS_GET_PROJECT
    payload: TProject
}
interface IProjectsIn {
    type: typeof PROJECTS_GET_PROJECTS,
    payload: TProject[]
}
interface INumber {
    type: typeof PROJECTS_DELETE_PROJECT | typeof PROJECTS_DELETE_PAGE | typeof PROJECTS_DELETE_PAGE_BLOCK
    payload: number
}
interface IGetCustomPage {
    type: typeof PROJECTS_GET_CUSTOM_PAGE,
    payload: { class_node: TNode, object_nodes: TNode[] }
}

interface IBoolean {
    type: typeof PROJECTS_PAGE_LOADING | typeof PROJECT_CHAT_LOADING
    payload: boolean
}

interface IProjectEmbedding {
    type: typeof PROJECT_GET_PROJECT_EMBEDDING,
    payload: TProjectEmbedding
}


interface IPage {
    type: typeof PROJECTS_CREATE_PAGE | typeof PROJECTS_UPDATE_PAGE | typeof PROJECTS_GET_PAGE
    payload: TPage
}

interface IBlock {
    type: typeof PROJECTS_CREATE_PAGE_BLOCK | typeof PROJECTS_UPDATE_PAGE_BLOCK
    payload: TPageBlock
}



export type TProjectDispatchTypes = IProjectIn | INumber | IProjectsIn | IGetCustomPage | IPage | IBlock | IBoolean | IProjectEmbedding | IProjectMessage