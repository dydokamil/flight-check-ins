import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import logger from "redux-logger"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import thunk from "redux-thunk"

import "./index.css"
import "bootstrap/dist/css/bootstrap.css"
import Seats from "./components/Seats"
import NotFound from "./components/NotFound"
import Navbar from "./components/Navbar"
import Reservation from "./components/Reservation"
import registerServiceWorker from "./registerServiceWorker"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/reservation" component={Reservation} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/" component={Seats} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
)
registerServiceWorker()
