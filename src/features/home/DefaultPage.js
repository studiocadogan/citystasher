import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import leaflet from 'leaflet';
import DivIcon from 'react-leaflet-div-icon';
import { Map, TileLayer, Popup } from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import Stashpoint from './StashpointDetails';
import Filters from './FilterPanel';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedStashpoint: {},
      selectedOpen: false
    };
  }

  renderStashpoint({ stashpoint }) {
    const { latitude, longitude } = stashpoint;

    return (<DivIcon position={[latitude, longitude]}>
      <span className="map-icon">
        <Popup>
          <span>
            <h3>{stashpoint.name}</h3>
            <p>{stashpoint.description}</p>

            <p>{stashpoint.address}, {stashpoint.postal_code}</p>
            <p><a onClick={() => this.setState({ selectedOpen: true, selectedStashpoint: stashpoint })}>View More</a></p>

          </span>
        </Popup>
      </span>
            </DivIcon>);
  }

  render() {
    const { locationData, stashpointData, getStashpointsPending } = this.props.home;
    return (
      <div className="home-default-page">
        <Filters setCenter={centerPoint => this.setState({centerPoint})}/>
        <Stashpoint open={this.state.selectedOpen} stashpoint={this.state.selectedStashpoint} close={() => this.setState({ selectedOpen: false })} />
        <div className="map-container">
          <Map center={this.state.centerPoint || locationData} zoom={16}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
              {getStashpointsPending && <div className="loading"><h1>Loading...</h1></div> }

              {locationData && <DivIcon position={locationData}>
              <div className="map-icon user" />
            </DivIcon>}
            {stashpointData && stashpointData.map(stashpoint => this.renderStashpoint({ stashpoint }))}
          </Map>
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
)(DefaultPage);
