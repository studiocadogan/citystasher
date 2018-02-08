import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions';
import { initialize } from '../../location';
import {auth} from '../../http'
/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    actions: PropTypes.object.isRequired
  };
    static defaultProps = {
      children: 'No content.',
    };

    componentDidMount() {
      const { setLocation, getStashpoints } = this.props.actions;
      initialize(setLocation);
      getStashpoints();


    }


    render() {
      return (
        <div className="home-app">
          <div className="page-container">
            {this.props.children}
          </div>
        </div>
      );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...commonActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
