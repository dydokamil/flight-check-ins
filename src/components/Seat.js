import React from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'

class Seat extends React.Component {
  state = {
    popoverOpen: false
  }

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  render() {
    const { seat } = this.props
    return (
      <React.Fragment>
        <Button onClick={this.toggle} id={`Popover${seat.id}`}>
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
                Price: ${this.props.basePrice} + ${seat.fee}
              </h5>
            </div>
            <div>
              <Button color="success">Book</Button>
            </div>
          </PopoverBody>
        </Popover>
      </React.Fragment>
    )
  }
}

export default Seat
