import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});