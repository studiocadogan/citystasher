import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import * as actions from './redux/actions';

export class StashpointDetails extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    stashpoint: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      bigPhotoOpen: false,
      bigPhoto: ''
    };
  }

  renderDay(day) {
    switch (day) {
      case 0: return 'Monday';
      case 1: return 'Tuesday';
      case 2: return 'Wednesday';
      case 3: return 'Thursday';
      case 4: return 'Friday';
      case 5: return 'Saturday';
      case 6: return 'Sunday';

      default: return 'Unknown day';
    }
  }

  renderBigPhoto() {
    return (
      <Transition in={this.state.bigPhotoOpen} mountOnEnter unmountOnExit timeout={{ enter: 0, exit: 0 }}>
        {state => (<div onClick={() => this.setState({ bigPhotoOpen: false })} className="big-photo">
          <img onClick={e => e.stopPropagation()} src={this.state.bigPhoto} alt="" />
                   </div>)}
      </Transition>);
  }

  renderImage(photo) {
    return <img alt="" role="button" tabIndex={0} onClick={() => this.setState({ bigPhoto: photo, bigPhotoOpen: true })} src={photo} />;
  }

  renderImageGrid(stashpoint) {
    return (<div className="image-box">
      <h4>Images</h4>
      {stashpoint.photos.map(photo => this.renderImage(photo))}
            </div>);
  }

  render() {
    const { stashpoint, open, close } = this.props;

    const slideTransition = {
      entering: { transform: 'translateX(500px)' },
      entered: { transform: 'translateX(0)' },
      exiting: { transform: 'translateX(500px)' },
      exited: { transform: 'translateX(500px)' },

    };

    return (
      <Transition in={open} mountOnEnter unmountOnExit timeout={{ enter: 0, exit: 300 }}>
        {state => <div style={{...slideTransition[state]}} className="home-stashpoint-details">
          <h1>{stashpoint.name}</h1>
          <h2>{stashpoint.location_name}</h2>
            {stashpoint.open_late && <h5 className="open-late">Open Late</h5>}

          <p className="body">{stashpoint.description}</p>

          <a className="close-button" role="button" tabIndex={0} onClick={() => close()}>Close</a>

          <div className="address-box">
            <h4>Address</h4>
            <p>{stashpoint.address}</p>
            <p>{stashpoint.postal_code}</p>

          </div>

          <div className="hours-box">
            <h4>Opening Hours</h4>
            {stashpoint.opening_hours.map(hours =>
              <p><b>{this.renderDay(hours.day)}:</b> {hours.open === hours.close ? '24 hours' : <span>{hours.open} - {hours.close}</span>}</p>)}
          </div>
            {stashpoint.photos && this.renderImageGrid(stashpoint)}
                                </div>}
          {this.renderBigPhoto()}

      </Transition>
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
)(StashpointDetails);
