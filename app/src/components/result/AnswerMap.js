import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GoogleMapReact from 'google-map-react';
import gql from 'graphql-tag';
import {Fragment, Component} from 'react';
import * as React from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

const ANSWER_MAP_SUBSCRIPTION = gql`
    subscription AnswerMapSubscription($gameId: uuid!) {
        Answer(where: {gameId: {_eq: $gameId}}) {
            latLocation
            longLocation
            playerID
        }
    }
`;

const CurrentPlayerMarker = () => <FontAwesomeIcon icon="map-marker"/>;

const OtherPlayerMarker = () => <FontAwesomeIcon icon="map-marker-alt"/>;

const SolutionMarker = () => <FontAwesomeIcon icon="map-pin"/>;

class AnswerMap extends Component {
  static defaultProps = {
    center: {
      lat: 45,
      lng: 260
    },
    zoom: 0
  };

  render() {
    if (!this.props.data.Answer) {
      return null;
    }

    console.log(this.props.data.Answer);

    return (
      <Fragment>
        <GoogleMapReact bootstrapURLKeys={{key: "AIzaSyA8cmyFachXAjlw_lc7QvC8JX1MnmGPJWw"}}
                        defaultCenter={this.props.center} defaultZoom={this.props.zoom}
                        onClick={this.handleClick}>
          {/*<Marker lat={this.state.latitude} lng={this.state.longitude}/>*/}
        </GoogleMapReact>
      </Fragment>
    )
  }
};

AnswerMap.propTypes = {
  gameId: PropTypes.string,
};

const withImage = graphql(ANSWER_MAP_SUBSCRIPTION, {
  options: ({gameId}) => ({
    variables: {id: gameId}
  })
});

export default withImage(AnswerMap);
