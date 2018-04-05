import React from 'react'
import { connect } from 'react-redux'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'

import Seat from './Seat'

class Seats extends React.Component {
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }

  render() {
    const { seats } = this.props
    return (
      <div>
        <h1>Seats</h1>
        {seats &&
          seats.map((seatRow, rowIdx) => {
            return (
              <Row key={rowIdx}>
                {seatRow.map((seatsSide, idx) => {
                  return seatsSide.map(seat => {
                    return (
                      <Col key={seat.id} lg={1} xs={1}>
                        <Seat basePrice={this.props.basePrice} seat={seat} />
                      </Col>
                    )
                  })
                })}
              </Row>
            )
          })}
        <Row>
          <Col style={{ marginTop: '1rem' }}>
            <Button color="primary">Random Seat</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  seats: state.seatsReducer.seats,
  basePrice: state.seatsReducer.basePrice
})

export default connect(mapStateToProps)(Seats)
