import React from "react"
import { connect } from "react-redux"
import { Button } from "reactstrap"
import { Container, Row, Col } from "reactstrap"

import Seat from "./Seat"
import "./Seats.css"
import * as actions from "../actions"

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
  componentDidMount() {
    this.props.fetchSeats()
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
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
    if (!seats) {
      return <div>Loading...</div>
    }
    const converted = convertTo2D(seats)
    return (
      <Container>
        <h1>Seats</h1>
        {seats &&
          converted.map((seatRow, rowIdx) => (
            <div className="flex-container" key={`flex${rowIdx}`}>
              {seatRow.map((seatsSide, idx) => (
                <div
                  key={`side${idx}`}
                  className={`${
                    idx ? "right-aligned-container" : "left-aligned-container"
                  }`}
                >
                  {seatsSide.map(seat => (
                    <div key={seat._id}>
                      <Seat
                        checkInFee={this.props.checkInFee}
                        basePrice={this.props.basePrice}
                        seat={seat}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        <Row>
          <Col style={{ marginTop: "1rem" }}>
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
  madeReservation: state.seatsReducer.madeReservation,
})

const mapDispatchToProps = dispatch => ({
  fetchSeats: () => {
    dispatch(actions.fetchSeats())
  },
  onBookSeat: seatId => {
    // refetch seats after 3 minutes
    // setTimeout(
    //   () => dispatch({ type: actions.FETCH_SEATS, payload: {} }),
    //   1000 * 60 * 3 + 5000,
    // )
    dispatch({
      type: actions.MAKE_RESERVATION,
      payload: { id: seatId, randomly: true },
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Seats)
