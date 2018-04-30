import React from "react"
import { Container } from "reactstrap"
import { connect } from "react-redux"
import { Button } from "reactstrap"

import * as actions from "../actions"

class Reservation extends React.Component {
  state = { seatId: null }

  componentDidMount = () => {
    if (this.props.email) {
      this.props.onGetReservation({ token: this.props.token })
    }
  }

  cancelReservation = () => {
    this.props.onCancelReservation({ token: this.props.token })
  }

  render() {
    const { paid, price, reservedUntil, seat } = this.props

    return (
      <Container>
        <h1>Reservation</h1>
        {!this.props.seat ? (
          <h2>You have not made any reservations.</h2>
        ) : (
          <div>
            <div>Your seat: {seat.id}</div>
            <div>Price: ${price}</div>
            <div>Paid: {paid ? "Yes" : "No"}</div>
            <div>Reserved until: {reservedUntil}</div>
            <Button onClick={this.cancelReservation} color="danger">
              Cancel Reservation
            </Button>
          </div>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  email: state.sessionReducer.email,
  token: state.sessionReducer.token,

  paid: state.reservationReducer.paid,
  price: state.reservationReducer.price,
  reservedUntil: state.reservationReducer.reservedUntil,
  seat: state.reservationReducer.seat,
})

const mapDispatchToProps = dispatch => ({
  onGetReservation: payload => dispatch(actions.getReservation(payload)),
  onCancelReservation: payload => dispatch(actions.cancelReservation(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reservation)
