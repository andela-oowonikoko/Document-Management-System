import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import SignupForm from '../../components/signup/SignupForm.component';

function setup() {
  const props = {
    userSignupRequest: () => {},
    addFlashMessage: () => {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return mount(<SignupForm {...props} />);
}

describe('SignupForm Test', () => {
  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('form')).toExist;
    expect(wrapper.find('input')).toExist;
    expect(wrapper.find('button')).toExist;
    expect(wrapper.find('h1').text()).toEqual('Sign Up');
  });

  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().userSignupRequest).toExist;
    expect(wrapper.props().addFlashMessage).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
