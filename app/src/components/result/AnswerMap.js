import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import * as React from "react";
import { Component } from "react";

const Marker = ({ isCurrentPlayer, isSolution }) => {
  // current player, solution, other players
  return isCurrentPlayer ? (
    <FontAwesomeIcon
      style={{ position: "absolute", top: -23, left: -9.375 }}
      size="2x"
      color="blue"
      icon="map-marker"
    />
  ) : isSolution ? (
    <FontAwesomeIcon
      style={{ position: "absolute", top: -33.5, left: -12 }}
      size="3x"
      color="green"
      icon="map-marker-alt"
    />
  ) : (
        <FontAwesomeIcon
          style={{ position: "absolute", top: -23, left: -9.375 }}
          size="2x"
          color="red"
          icon="map-marker"
        />
      );
};

class AnswerMap extends Component {
  static defaultProps = {
    center: {
      lat: 45,
      lng: 0
    },
    zoom: 0
  };

  render() {
    if (!this.props.answer || !this.props.game) {
      return null;
    }

    const question = this.props.game[0].questions;

    return (
      <div style={{ height: "75vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA8cmyFachXAjlw_lc7QvC8JX1MnmGPJWw" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.answer.map((answer, i) => {
            return (
              <Marker
                key={i}
                lat={answer.latLocation}
                lng={answer.longLocation}
                isCurrentPlayer={
                  localStorage.getItem("witw-playerId") === answer.playerID
                }
              />
            );
          })}
          <Marker
            lat={question.latLocation}
            lng={question.longLocation}
            isSolution
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default AnswerMap;
