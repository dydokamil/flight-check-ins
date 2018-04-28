import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import logger from "redux-logger"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import thunk from "redux-thunk"

import "./index.css"
import "bootstrap/dist/css/bootstrap.css"
import Seats from "./components/Seats"
import Reservation from "./components/Reservation"
import registerServiceWorker from "./registerServiceWorker"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/reservation/" component={Reservation} />
        <Route path="/" component={Seats} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
)
registerServiceWorker()
