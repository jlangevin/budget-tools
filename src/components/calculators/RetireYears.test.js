import React from 'react';
import {shallow, mount, render } from 'enzyme';
import RetireYears from './RetireYears';

describe('RetireYears', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<RetireYears />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render an <h4 />', () => {
    const component = mount(
      <RetireYears />
    );
    console.log(component.find('h4').exists());   
    expect(component.find('h4').exists()).toEqual(true);
    expect(component.find('h4').text()).toEqual('Years to Retirement');
  });
});