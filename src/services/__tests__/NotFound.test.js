import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import NotFound from '../../components/NotFound'

Enzyme.configure({ adapter: new Adapter() })

describe('test login component', () => {
  it('should render the component', () => {
    const wrapper = shallow(<NotFound />)

    expect(wrapper).toMatchSnapshot()
  })
})
