import React from 'react'
// { shallow, mount }
// shallow create a shallow copy of our component
import { shallow } from 'enzyme'

import HelloWorld from './HelloWorld'

// describe a block of tests
// describe('text that descibes the test', callback)
describe('Hello world comnponent being tested', () => {
  // write one test
  // it('text that decribes the specic test', callback)
  it('should render as expected', () => {
   const component = shallow(<HelloWorld name={'Your name'} />)
   expect(component.contains('Your name')).toBe(true)
  })
})