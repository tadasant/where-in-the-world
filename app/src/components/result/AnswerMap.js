import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GoogleMapReact from 'google-map-react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Component} from 'react';
import {graphql} from 'react-apollo';

const ANSWER_MAP_SUBSCRIPTION = gql`
    subscription AnswerMapSubscription($gameId: uuid!) {
        Answer(where: {gameId: {_eq: $gameId}}) {
            latLocation
            longLocation
            playerID
        }
        Game(where: {id: {_eq: $gameId}}) {
            questions {
                latLocation
                longLocation
                location
            }
        }
    }
`;

const Marker = ({isCurrentPlayer, isSolution}) => {
  // current player, solution, other players
  return isCurrentPlayer ? <FontAwesomeIcon icon="map-marker"/> : isSolution ? <FontAwesomeIcon icon="map-pin"/> :
    <FontAwesomeIcon icon="map-marker-alt"/>;
};

class AnswerMap extends Component {
  static defaultProps = {
    center: {
      lat: 45,
      lng: 260
    },
    zoom: 0
  };

  render() {
    if (!this.props.data.Answer || !this.props.data.Game) {
      return null;
    }

    const question = this.props.data.Game[0].questions;

    return (
      <div style={{height: "100vh", width: "100%"}}>
        <GoogleMapReact bootstrapURLKeys={{key: "AIzaSyA8cmyFachXAjlw_lc7QvC8JX1MnmGPJWw"}}
                        defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
          {this.props.data.Answer.map((answer, i) => {
            return <Marker key={i} lat={answer.latLocation} lng={answer.longLocation}
                    isCurrentPlayer={localStorage.getItem("witw-playerId") === answer.playerID}/>
          })}
          <Marker lat={question.latLocation} lng={question.longLocation} isSolution/>
        </GoogleMapReact>
      </div>
    )
  }
}

AnswerMap.propTypes = {
  gameId: PropTypes.string,
};

const withMapData = graphql(ANSWER_MAP_SUBSCRIPTION, {
  options: ({gameId}) => ({
    variables: {gameId}
  })
});

export default withMapData(AnswerMap);
