import React from "react"
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap"
import { connect } from "react-redux"

import * as actions from "../actions"
import "./Seat.css"

class Seat extends React.Component {
  state = {
    popoverOpen: false,
    id: this.props.seat.id,
  }

  componentDidMount = () => {
    this.setState({ canBook: !this.props.madeReservation })
  }

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  bookSeat = () => {
    const payload = { token: this.props.token, seat: this.state.id }

    this.props.onBookSeat(payload)
  }

  render() {
    const { seat } = this.props

    return (
      <React.Fragment>
        <Button
          className="seat"
          onClick={this.toggle}
          id={`Popover${seat.id}`}
          disabled={!seat.available}
        >
          {seat.id}
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={`Popover${seat.id}`}
          toggle={this.toggle}
        >
          <PopoverHeader>Seat {seat.id}</PopoverHeader>
          <PopoverBody>
            <div>
              <h5>
                Price: ${this.props.basePrice} + ${seat.fee +
                  this.props.checkInFee}
              </h5>
              <small>Fees included.</small>
            </div>
            <div>
              <Button
                // disabled={this.props.madeReservation}
                disabled={!this.props.token}
                onClick={this.bookSeat}
                color="success"
              >
                Book
              </Button>
            </div>
          </PopoverBody>
        </Popover>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onBookSeat: payload => {
    // refetch seats after 3 minutes
    // setTimeout(
    //   dispatch({ type: actions.FETCH_SEATS, payload: {} }),
    //   1000 * 60 * 3 + 5000,
    // );
    dispatch(actions.makeReservation(payload))
  },
})

const mapStateToProps = state => ({
  // madeReservation: state.seatsReducer.madeReservation,
  token: state.sessionReducer.token,
  email: state.sessionReducer.email,
})

export default connect(mapStateToProps, mapDispatchToProps)(Seat)
