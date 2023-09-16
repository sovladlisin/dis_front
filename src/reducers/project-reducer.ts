import { TNode } from "../actions/graph/types"
import { PROJECTS_CREATE_PROJECT, PROJECTS_DELETE_PROJECT, PROJECTS_GET_CUSTOM_PAGE, PROJECTS_GET_PROJECT, PROJECTS_GET_PROJECTS, PROJECTS_UPDATE_PROJECT, TProject, TProjectDispatchTypes } from "../actions/projects/types"

interface IDefaultState {
    projects: TProject[],
    selected_project: TProject,
    custom_page: { class_node: TNode, object_nodes: TNode[] }
}

const defaultState: IDefaultState = {
    projects: [],
    selected_project: null,
    custom_page: null

}

export const projectReducer = (state: IDefaultState = defaultState, action: TProjectDispatchTypes) => {
    switch (action.type) {

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

