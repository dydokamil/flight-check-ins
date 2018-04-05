import React from 'react'
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from 'reactstrap'

import { Link } from 'react-router-dom'

export default class Example extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Flight Company
          </Link>
          <ul className="ml-auto navbar-nav">
            <li className="nav-item">
              <Link to="/reservation" className="nav-link">
                Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Seats
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
