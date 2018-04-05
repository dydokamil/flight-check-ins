import React from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { connect } from 'react-redux'

import * as actions from '../actions'

class Seat extends React.Component {
  state = {
    popoverOpen: false,
    id: this.props.seat.id,
    canBook: true
  }

  componentDidMount = () => {
    this.setState({ canBook: !this.props.madeReservation })
  }

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  bookSeat = () => {
    this.props.onBookSeat(this.state.id)
    this.setState({ canBook: false })
  }

  render() {
    const { seat } = this.props

    return (
      <React.Fragment>
        <Button
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
                disabled={this.props.madeReservation}
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

const mapStateToProps = state => ({
  madeReservation: state.seatsReducer.madeReservation
})

export default connect(mapStateToProps, mapDispatchToProps)(Seat)
