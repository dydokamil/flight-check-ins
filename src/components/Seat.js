import React from "react"
import PropTypes from "prop-types"
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap"
import { connect } from "react-redux"

import * as actions from "../actions"
import "./Seat.css"

export class Seat extends React.Component {
  state = {
    popoverOpen: false,
    id: this.props.seat.id,
  }

  toggle = (event) => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  bookSeat = () => {
    const payload = { token: this.props.token, seat: this.state.id }

    this.props.onBookSeat(payload)
    this.setState({ popoverOpen: false })
  }

  render() {
    const { seat } = this.props

    return (
      <React.Fragment>
        <Button
          className="seat"
          onClick={(event) => this.toggle(event)}
          id={`Popover${seat.id}`}
          disabled={!seat.available}
        >
          {seat.id}
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={`Popover${seat.id}`}
          toggle={(event) => this.toggle(event)}
        >
          <PopoverHeader>Seat {seat.id}</PopoverHeader>
          <PopoverBody>
            <div>
              <h5>
                Price: ${this.props.basePrice + seat.fee} + ${
                  +this.props.checkInFee
                }
              </h5>
              <small>Fees included.</small>
            </div>
            <div>
              <Button
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

Seat.propTypes = {
  seat: PropTypes.object,
  checkInFee: PropTypes.number,
  basePrice: PropTypes.number,
  onBookSeat: PropTypes.func,
  sessionReducer: PropTypes.object,
}

export const mapDispatchToProps = (dispatch) => ({
  onBookSeat: (payload) => dispatch(actions.makeReservation(payload)),
})

export const mapStateToProps = (state) => ({
  token: state.sessionReducer.token,
  email: state.sessionReducer.email,
})

export default connect(mapStateToProps, mapDispatchToProps)(Seat)
