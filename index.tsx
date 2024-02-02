import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/App'

//css
import './src/static/css/fixer.css'
import './src/static/css/main-edge.css'
import './src/static/css/main-node.css'
import './src/static/css/forms.css'
import './src/static/css/graph.css'
import './src/static/css/pattern.css'
import './src/static/css/project.css'
import './src/static/css/info.css'
import './src/static/css/vkauth.css'
import './src/static/css/main.css'
// import './node_modules/react-grid-layout/css/styles.css'
// import './node_modules/react-resizable/css/styles.css'

import '@fortawesome/fontawesome-free/css/all.min.css';



import { persistStore } from 'redux-persist'
import store from './src/store'
import { PersistGate } from 'redux-persist/integration/react'


const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.querySelector('#root')
)