import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class FilterPanel extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    setCenter: PropTypes.func
  };

  static defaultProps = {
    setCenter: () => null
  }


  constructor() {
    super();
    this.state = {
      currentFilter: '',
      sortBy: ''
    };
  }
  setOpenLate() {
    const { getStashpoints } = this.props.actions;

    const { currentFilter } = this.state;

    this.setState({ currentFilter: currentFilter === 'open_late' ? '' : 'open_late' });
    getStashpoints(currentFilter === 'open_late' ? null : 'open_late=true');
  }

  sortByDistance() {
    const { sortBy } = this.state;
    const { getStashpoints } = this.props.actions;
    const { locationData } = this.props.home;

    this.setState({ sortBy: sortBy === 'Distance' ? '' : 'Distance' });
    getStashpoints(sortBy === 'Distance' ? null : `sort_order=desc&by_distance=true&centre_lat=${locationData[0]}&centre_lon=${locationData[1]}`);
  }

  renderPoints(stashpoint) {
    return (<div className="stashpoint-data" onClick={() => this.props.setCenter([stashpoint.latitude, stashpoint.longitude])}>
      <h3>{stashpoint.name}</h3>
            </div>);
  }

  render() {
    const { currentFilter } = this.state;
    const { stashpointData, locationData } = this.props.home;
    return (
      <div className="home-filter-panel">
        <div className="stashpoint-box">
          {stashpointData && stashpointData.map(stashpoint => this.renderPoints(stashpoint))}
        </div>
        <div className="box">
          <button onClick={() => this.props.setCenter(locationData || [51.5074,  0.1278])}>Your Location</button>
          <h4>Filters</h4>
          <button onClick={() => this.setOpenLate()}>Open Late {currentFilter === 'open_late' && '(Selected)'}</button>
          <h4>Sort By</h4>
          <button onClick={() => this.sortByDistance()}>Distance</button>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPanel);
