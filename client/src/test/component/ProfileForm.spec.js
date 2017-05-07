import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import ProfileForm from '../../components/profile/ProfilePage.component';

function setup() {
  const props = {
    user: 0,
    getUser: () => {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return mount(<ProfileForm {...props} />);
}

describe('ProfileForm Test', () => {
  // it('should render self', () => {
  //   const wrapper = setup();
  //   expect(wrapper.length).toEqual(1);
  //   expect(wrapper.find('form')).toExist;
  //   expect(wrapper.find('Row')).toExist;
  //   expect(wrapper.find('Input')).toExist;
  //   expect(wrapper.find('Button')).toExist;
  //   expect(wrapper.find('Button').text()).toEqual('UPDATE');
  // });

  // it('should take props', () => {
  //   const wrapper = setup();
  //   expect(wrapper.props().getUser).toExist;
  //   expect(wrapper.props().getUser).toExist;
  //   expect(wrapper.props().onChange).toExist;
  //   expect(wrapper.props().onSubmit).toExist;
  // });
});
