import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import Index from '../../components/common/Index.component';
import NavBar from '../../components/common/Nav.component';

describe(' Test for App Component', () => {
  it('renders without crashing', () => {
    shallow(<Index />);
  });

  it('renders NavBar', () => {
    const wrapper = shallow(<Index />);
    const navbar = (<NavBar
      isUserActive=""
      isHomeActive="active"
      isDocumentActive=""
      isLoginActive=""
      isSignupActive=""
    />);
    expect(wrapper.contains(navbar)).toEqual(true);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <Index>
        <NavBar
          isUserActive=""
          isHomeActive="active"
          isDocumentActive=""
          isLoginActive=""
          isSignupActive=""
        />
      </Index>
    );
    expect(wrapper.contains(<NavBar
      isUserActive=""
      isHomeActive="active"
      isDocumentActive=""
      isLoginActive=""
      isSignupActive=""
    />)).toEqual(true);
  });
});
