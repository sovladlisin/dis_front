import { FILES_DELETE_FILE, FILES_GET_FILE, FILES_GET_FILES, FILES_UPDATE_FILE, FILES_UPLOAD_FILE, TFile, TFileDispatchTypes } from "../actions/files/types"
import { TNode } from "../actions/graph/types"

interface IDefaultState {
    files: TFile[],
    selected_file: TFile
}

const defaultState: IDefaultState = {
    files: [],
    selected_file: null

}

export const fileReducer = (state: IDefaultState = defaultState, action: TFileDispatchTypes) => {
    switch (action.type) {
        case FILES_GET_FILE:
            return {
                ...state,
                selected_file: action.payload
            }
        case FILES_GET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case FILES_UPDATE_FILE:
            return {
                ...state,
                files: state.files.map(f => f.id === action.payload.id ? action.payload : f),
                selected_file: state.selected_file.id === action.payload.id ? action.payload : state.selected_file
            }
        case FILES_DELETE_FILE:
            return {
                ...state,
                files: state.files.filter(f => f.id != action.payload)
            }
        case FILES_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload],
                selected_file: action.payload
            }

        default:
            return state
    }
}

