import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import Seats from './Seats'
import './App.css'

class App extends Component {
  render() {
    return (
      <Container>
        <Seats />
      </Container>
    )
  }
}

export default App
