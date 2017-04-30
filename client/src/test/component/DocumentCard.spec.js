import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentCard from '../../components/document/DocumentCard.component';

function setup() {
  const props = {
    document: { title: '', content: '', access: '' },
    deleteDocument: () => {},
    updateDocument: () => {},
    currentUser: { userId: '' }
  };

  return mount(<DocumentCard {...props} />);
}

describe('DocumentForm Test', () => {
  it('renders a row div', () => {
    const wrapper = setup();
    expect(wrapper.find('.row')).toExist;
  });

  it('renders card', () => {
    const wrapper = setup();
    expect(wrapper.find('.card')).toExist;
  });
});
