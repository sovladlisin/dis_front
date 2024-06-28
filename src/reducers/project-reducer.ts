import { TNode } from "../actions/graph/types"
import { PROJECTS_CREATE_PAGE, PROJECTS_CREATE_PAGE_BLOCK, PROJECTS_CREATE_PROJECT, PROJECTS_DELETE_PAGE, PROJECTS_DELETE_PAGE_BLOCK, PROJECTS_DELETE_PROJECT, PROJECTS_GET_CUSTOM_PAGE, PROJECTS_GET_PAGE, PROJECTS_GET_PROJECT, PROJECTS_GET_PROJECTS, PROJECTS_PAGE_LOADING, PROJECTS_UPDATE_PAGE, PROJECTS_UPDATE_PAGE_BLOCK, PROJECTS_UPDATE_PROJECT, PROJECT_GET_PROJECT_EMBEDDING, PROJECT_GET_PROJECT_MESSAGE, PROJECT_SET_MEDIA_BLOCK, TPage, TPageBlock, TProject, TProjectDispatchTypes, TProjectEmbedding, TProjectMessage } from "../actions/projects/types"

interface IDefaultState {
    projects: TProject[],
    selected_project: TProject,
    custom_page: { class_node: TNode, object_nodes: TNode[] },

    current_page: TPage,

    new_block: TPageBlock,
    updated_block: TPageBlock,
    deleted_block: number,


    is_page_loading: boolean,

    project_embedding: TProjectEmbedding,
    new_project_message: TProjectMessage,
    is_project_chat_loading: boolean,


    media_node: TNode


}

const defaultState: IDefaultState = {
    projects: [],
    selected_project: null,
    custom_page: null,

    current_page: null,

    new_block: null,
    updated_block: null,
    deleted_block: -1,

    is_page_loading: false,

    project_embedding: null,
    new_project_message: null,
    is_project_chat_loading: false,

    media_node: null
}

export const projectReducer = (state: IDefaultState = defaultState, action: TProjectDispatchTypes) => {
    switch (action.type) {
        case PROJECT_SET_MEDIA_BLOCK:
            return {
                ...state,
                media_node: action.payload
            }
        case PROJECT_GET_PROJECT_MESSAGE:
            return {
                ...state,
                new_project_message: action.payload
            }

        case PROJECT_GET_PROJECT_EMBEDDING:
            return {
                ...state,
                project_embedding: action.payload
            }
        case PROJECTS_PAGE_LOADING:
            return {
                ...state,
                is_page_loading: action.payload
            }

        case PROJECTS_CREATE_PAGE_BLOCK:
            return {
                ...state,
                new_block: action.payload
            }
        case PROJECTS_UPDATE_PAGE_BLOCK:
            return {
                ...state,
                updated_block: action.payload
            }

        case PROJECTS_DELETE_PAGE_BLOCK:
            return {
                ...state,
                deleted_block: action.payload
            }

        case PROJECTS_CREATE_PAGE:
            return {
                ...state,
                selected_project: action.payload.project_id === state.selected_project.id ? { ...state.selected_project, pages: [...state.selected_project.pages, action.payload] } : state.selected_project
            }

        case PROJECTS_UPDATE_PAGE:
            return {
                ...state,
                selected_project: action.payload.project_id === state.selected_project.id ? { ...state.selected_project, pages: state.selected_project.pages.map(p => p.id === action.payload.id ? action.payload : p) } : state.selected_project
            }

        case PROJECTS_DELETE_PAGE:
            return {
                ...state,
                selected_project: { ...state.selected_project, pages: state.selected_project.pages.filter(p => p.id != action.payload) }
            }

        case PROJECTS_GET_PAGE:
            return {
                ...state,
                current_page: action.payload
            }



        case PROJECTS_GET_CUSTOM_PAGE:
            return {
                ...state,
                custom_page: action.payload
            }

        case PROJECTS_CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }

        case PROJECTS_DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(p => p.id != action.payload),
                selected_project: state.selected_project.id != action.payload ? state.selected_project : null
            }

        case PROJECTS_UPDATE_PROJECT:
            return {
                ...state,
                projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p),
                selected_project: state.selected_project.id === action.payload.id ? action.payload : state.selected_project
            }

        case PROJECTS_GET_PROJECT:
            return {
                ...state,
                selected_project: action.payload
            }

        case PROJECTS_GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }

        default:
            return state
    }
}

