import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button } from "reactstrap"
import { Container, Row, Col, Alert } from "reactstrap"
import { RotateLoader } from "react-spinners"

import Seat from "./Seat"
import "./Seats.css"
import * as actions from "../actions"

export const convertTo2D = (seats) => {
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

export class Seats extends React.Component {
  componentDidMount() {
    this.props.fetchSeats()
  }

  bookRandomSeat = () => {
    const { token } = this.props

    this.props.onRandomReservation({ token })
  }

  render() {
    const { seatsReducer } = this.props
    const { basePrice, checkInFee } = seatsReducer

    if (seatsReducer.error) {
      return <div>{seatsReducer.error}</div>
    }
    if (seatsReducer.loading) {
      return (
        <div className="centered-div">
          <RotateLoader color={"#123abc"} />
        </div>
      )
    }
    if (!seatsReducer.seats || !seatsReducer.seats.length) {
      return <Container>No seats.</Container>
    }
    const converted = convertTo2D(seatsReducer.seats)
    return (
      <Container>
        {this.props.reservationError && (
          <Alert color="danger">{this.props.reservationError}</Alert>
        )}
        <h1>Seats</h1>
        {converted.map((seatRow, rowIdx) => (
          <div className="flex-container" key={`flex${rowIdx}`}>
            {seatRow.map((seatsSide, idx) => (
              <div
                key={`side${idx}`}
                className={`${
                  idx ? "right-aligned-container" : "left-aligned-container"
                }`}
              >
                {seatsSide.map((seat) => (
                  <div key={seat._id}>
                    <Seat
                      checkInFee={checkInFee}
                      basePrice={basePrice}
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
              disabled={!this.props.token}
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

Seats.propTypes = {
  fetchSeats: PropTypes.func,
  onRandomReservation: PropTypes.func,
  token: PropTypes.string,
  reservationError: PropTypes.string,
  seatsReducer: PropTypes.object,
}

export const mapStateToProps = (state) => ({
  seatsReducer: state.seatsReducer,
  token: state.sessionReducer.token,

  reservationError: state.reservationReducer.error,
})

export const mapDispatchToProps = (dispatch) => ({
  fetchSeats: () => dispatch(actions.fetchSeats()),
  onRandomReservation: (payload) =>
    dispatch(actions.makeRandomReservation(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Seats)
