import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import {
  mapStateToProps,
  mapDispatchToProps,
  Navbar,
} from '../../components/Navbar'

Enzyme.configure({ adapter: new Adapter() })

describe('test navbar', () => {
  it('should not render logout button when email is not provided', () => {
    const component = shallow(<Navbar />)

    expect(component.find("button[children='Log Out']").length).toEqual(0)
  })
  it('should render logout button when email is provided', () => {
    const component = shallow(<Navbar email="john@doe.com" />)

    expect(component.find("button[children='Log Out']").length).toEqual(1)
  })

  it('should call `onLogOut` passed from props when logout button is clicked', () => {
    const onLogOut = jest.fn()

    const component = shallow(
      <Navbar email="john@doe.com" onLogOut={onLogOut} />,
    )

    component.find("button[children='Log Out']").simulate('click')

    expect(onLogOut).toHaveBeenCalledTimes(1)
  })

  it('should assign email prop a value from a reducer', () => {
    const INITIAL_STATE = { sessionReducer: { email: 'John@doe.com' } }
    expect(mapStateToProps(INITIAL_STATE).email).toEqual('John@doe.com')
  })

  it('should call `onLogOut` when logout button is clicked', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onLogOut()
    expect(dispatch).toHaveBeenCalledTimes(2)
  })
})
