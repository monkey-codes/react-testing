import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';


//Purpose:
// Set up testing environment to run like a browser in the command line

global.document = jsdom.jsdom('<!docktype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  //this is not the DOM Node!
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>

  )

  return $(ReactDOM.findDOMNode(componentInstance));

}


// Build helper for simulating events
$.fn.simulate = function(eventName, value) {
  //inside the function 'this' is an array of selected DOM nodes from the preceding jquery selector.
  // eg $('div').simulate(...)

  if(value) {
    this.val(value);
  }

  //https://facebook.github.io/react/docs/test-utils.html#simulate
  TestUtils.Simulate[eventName](this[0]);

}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export {renderComponent, expect}


