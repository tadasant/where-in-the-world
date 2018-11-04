import AnswerSelection from './AnswerSelection';
import PropTypes from "prop-types";
import * as React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import GoogleMapReact from "google-map-react";

class GameScreen extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 0
  };
  componentDidMount() {
    const { game } = this.props;
    const pushToResults = () =>
      this.props.history.push(`/results?gameid=${game.id}`);
    const endDateTime = new Date(game.endDateTime);
    const currentDateTime = new Date();

    if (endDateTime < currentDateTime) {
      pushToResults();
    } else {
      setTimeout(pushToResults, endDateTime - currentDateTime);
    }
  }

  handleMapClick = ({x, y, lat, lng, event}) => {
    console.log(x, y, lat, lng, event);
  }

  render() {
    const { game } = this.props;
    return <div>
        Game:
        <br />
        <div>
          ID: {game.id}<br/>
          endDateTime: {game.endDateTime}<br/>
          questionId: {game.questions.id}<br/>
          questionImage: <img src={game.questions.imgURL}/>
          <AnswerSelection questionId={game.questions.id} gameId={game.id}/>
        </div>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyA8cmyFachXAjlw_lc7QvC8JX1MnmGPJWw" }} defaultCenter={this.props.center} defaultZoom={this.props.zoom} onClick={this.handleMapClick} />
        </div>
      </div>;
  }
}

GameScreen.propTypes = {
  game: PropTypes.object
};

export default withRouter(GameScreen);
