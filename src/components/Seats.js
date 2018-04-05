import React from 'react'
import { connect } from 'react-redux'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'

import Seat from './Seat'
import Navbar from './Navbar'
import * as actions from '../actions'

export const convertTo2D = seats => {
  let rows = []
  for (let i = 0; i < seats.length / 6; i++) {
    let leftSide = []
    let rightSide = []

    const row = seats.slice(i * 6, i * 6 + 6)
    leftSide = row.slice(0, 3)
    rightSide = row.slice(3, 6)
    rows.push([leftSide, rightSide])
  }
  return rows
}

class Seats extends React.Component {
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }

  bookRandomSeat = () => {
    const availableSeats = this.props.seats.filter(seat => seat.available)
    const seatIdList = availableSeats.map(seat => seat.id)

    const randomSeat = seatIdList[Math.floor(Math.random() * seatIdList.length)]

    this.props.onBookSeat(randomSeat)
  }

  render() {
    const { seats } = this.props
    const converted = convertTo2D(seats)
    return (
      <Container>
        <Navbar />
        <h1>Seats</h1>
        {seats &&
          converted.map((seatRow, rowIdx) => {
            return (
              <Row key={rowIdx}>
                {seatRow.map((seatsSide, idx) => {
                  return seatsSide.map(seat => {
                    return (
                      <Col key={seat.id} lg={1} xs={1}>
                        <Seat
                          checkInFee={this.props.checkInFee}
                          basePrice={this.props.basePrice}
                          seat={seat}
                        />
                      </Col>
                    )
                  })
                })}
              </Row>
            )
          })}
        <Row>
          <Col style={{ marginTop: '1rem' }}>
            <Button
              disabled={this.props.madeReservation}
              onClick={this.bookRandomSeat}
              color="primary"
            >
              Random Seat
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  seats: state.seatsReducer.seats,
  basePrice: state.seatsReducer.basePrice,
  checkInFee: state.seatsReducer.checkInFee,
  madeReservation: state.seatsReducer.madeReservation
})

const mapDispatchToProps = dispatch => ({
  onBookSeat: seatId => {
    // refetch seats after 3 minutes
    setTimeout(
      () => dispatch({ type: actions.GET_SEATS, payload: {} }),
      1000 * 60 * 3 + 5000
    )
    dispatch({
      type: actions.MAKE_RESERVATION,
      payload: { id: seatId }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Seats)
