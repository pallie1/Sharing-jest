import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import HelloWorld from './components/HelloWorld/HelloWorld'

// THIS IS ALL JEST..NO ENZYME
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import { shallow, mount } from 'enzyme'

// describe will run one or more tests
describe('App component', () => {
  let component;
  // before every test makes sure this is loaded
  beforeEach( () => {
    component = mount(<App />)
  })
  
  // it is one of those  single tests
  it('renders HelloWorld', () => {
    // let component = mount(<App /> )
    expect(component.contains(HelloWorld))
  })
})


import { isMainThread } from 'worker_threads';