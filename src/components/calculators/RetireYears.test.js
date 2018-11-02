import React from 'react';
import RetireYears from './RetireYears';
import {shallow, mount, render } from 'enzyme';

describe('RetireYears', () => {
  it('should render', () => {

  it('should render a <div />', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('div').length).toEqual(1);
      });
    });


    // const componentSnap = renderer(
    //   <RetireYears />
    // );  
    // let tree = componentSnap.toJSON();
    // expect(tree).toMatchSnapshot();

    const component = mount(
      <RetireYears />
    );

    console.log(component.find('h4').exists());   
    expect(component.find('h4').exists()).toEqual(true);
    expect(component.find('h4').text()).toEqual('Years to Retirement');

  });
});