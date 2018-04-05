import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import logger from 'redux-logger'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
