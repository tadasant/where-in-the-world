import GoogleMapReact from 'google-map-react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {graphql} from 'react-apollo';
import {withRouter} from 'react-router-dom';

const INSERT_ANSWER = gql`
    mutation InsertAnswer($gameId: uuid!, $playerId: uuid!, $latLocation: Float!, $longLocation: Float!) {
        insert_Answer(objects: [{
            gameId: $gameId,
            latLocation: $latLocation,
            longLocation: $longLocation,
            playerID: $playerId,
        }]) {
            affected_rows
        }
    }
`;

class AnswerSelection extends Component {
  static defaultProps = {
    center: {
      lat: 45,
      lng: 260
    },
    zoom: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit() {
    this.props
      .mutate({
        variables: {
          gameId: this.props.gameId,
          playerId: localStorage.getItem('witw-playerId'),
          latLocation: parseFloat(this.state.latitude),
          longLocation: parseFloat(this.state.longitude),
        }
      })
      .then(() => {
        // move player to results screen
        this.props.history.push(`/results?gameid=${this.props.gameId}`);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  }

  handleClick({ x, y, lat, lng }) {
    this.setState({
      latitude: lat,
      longitude: lng
    });
  }

  render() {
    return (
      <Fragment>
        <div style={{height: "100vh", width: "100%"}}>
          <GoogleMapReact bootstrapURLKeys={{key: "AIzaSyA8cmyFachXAjlw_lc7QvC8JX1MnmGPJWw"}}
                          defaultCenter={this.props.center} defaultZoom={this.props.zoom}
                          onClick={this.handleClick}/>
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </Fragment>
    )
  }
}

AnswerSelection.propTypes = {
  questionId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
};

export default withRouter(graphql(INSERT_ANSWER)(AnswerSelection));
