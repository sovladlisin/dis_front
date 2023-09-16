// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import RootReducer from "./reducers/root-reducer";

// const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));


// export type RootStore = ReturnType<typeof RootReducer>

// export default Store

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "./reducers/root-reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

export const config = {
    key: 'root',
    storage: storage,
    blacklist: ['router'],
    stateReconciler: autoMergeLevel2
};
const middleware = [thunk];
const persisted = persistReducer(config, RootReducer);
export type RootStore = ReturnType<typeof RootReducer>

const store = createStore(
    persisted,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store