import Loader from './Loader';
import React from 'react';
import { shallow } from 'enzyme';

describe('Loader', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});