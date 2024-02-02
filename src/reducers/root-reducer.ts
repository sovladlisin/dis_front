import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import { graphReducer } from "./graph-reducer";
import { ontologyReducer } from "./ontology-reducer";
import { settingsReducer } from "./settings-reducer";
import { projectReducer } from "./project-reducer";
import { fileReducer } from "./file-reducer";
import { authReducer } from "./auth-reducer";



const RootReducer = combineReducers({
    alerts: alertReducer,
    graph: graphReducer,
    ontology: ontologyReducer,
    settings: settingsReducer,
    projects: projectReducer,
    files: fileReducer,
    auth: authReducer
});

export default RootReducer