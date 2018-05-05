import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"

import Seats from "./Seats"
import Navbar from "./Navbar"
import "./App.css"

class App extends Component {
  render() {
    return (
      <Container>
        <Navbar />
        <Seats />
      </Container>
    )
  }
}

export default App
