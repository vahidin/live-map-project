import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';
import Popup from '../Popup';
import Marker from '../Marker';
import Controls from '../Controls';
import { citiesActions } from '../../state/actions'

class Map extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100vh",
      latitude: 20.677031,
      longitude: -103.346968,
      zoom: 11
    },
    popupInfo: null
  }

  componentDidMount() {
    this.props.fetchCities();
  }

  updateViewport = viewport => this.setState({ viewport });

  closePopupHandler = () => this.setState({ popupInfo: null })

  showInfoHadler = city => this.setState({ popupInfo: city })

  render() {
    return this.props.cities && (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
        onViewportChange={this.updateViewport}
      >
        <Marker data={this.props.cities.data} showInfoHandler={this.showInfoHadler}/>
        <Popup popupInfo={this.state.popupInfo} onCloseHandler={this.closePopupHandler} />
        <Controls updateViewport={this.updateViewport} />
      </ReactMapGL>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.citiesReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCities: () => dispatch(citiesActions.fetchCities())
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);
