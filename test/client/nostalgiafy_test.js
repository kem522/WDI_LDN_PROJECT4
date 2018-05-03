/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NewRoute from '../../src/components/playlists/NewRoute';
// import App from '../src/app.js';

describe('NewRoute tests', () => {

  it('should render 6 buttons, 5 eras and one submit', done => {
    const wrapper = shallow(<NewRoute />);
    expect(wrapper.find('button').length).to.equal(6);
    // expect(wrapper.find('span').length).to.equal(1);
    done();
  });
});
