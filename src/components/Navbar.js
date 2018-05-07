import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import './Navbar.css'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Navbar extends React.Component {
  logOut = () => {
    this.props.onLogOut()
  }

  render () {
    const { email } = this.props
    return (
      <div className="myNavbar">
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
            {/* Session */}
            {email ? (
              <React.Fragment>
                <li className="nav-item">
                  <a className="nav-link">Logged as {email}</a>
                </li>
                <li className="nav-item">
                  <button onClick={this.logOut} className="nav-link">
                    Log Out
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </React.Fragment>
            )}
            {/* Session */}
          </ul>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  email: PropTypes.string,
  onLogOut: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  email: state.sessionReducer.email,
})

export const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => {
    dispatch(actions.logOut())
    dispatch(actions.cleanUp())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
