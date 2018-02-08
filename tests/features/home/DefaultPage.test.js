import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ConnectedDefaultPage, { DefaultPage } from 'src/features/home/DefaultPage';


describe('features/home/DefaultPage', () => {
  it('redux connect works', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const store = createStore(state => state, pageProps);

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedDefaultPage />
      </Provider>
    );

    expect(
      wrapper.find('.home-default-page').length
    ).to.equal(1);
  });

  it('should render node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.home-default-page').getElement()
    ).to.exist;
  });

  it('Should display loading toast when loading', () => {
    const pageProps = {
      home: {
        setStashpointsPending: true,
      },
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.loading]').getElement()
    ).to.exist;
  });

});
