import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Component} from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="latitude"
          onChange={(e) => this.setState({latitude: e.target.value || ''})}
          placeholder="Latitude (0-90)"
          value={this.state.name}
        />
        <input
          type="text"
          name="longitude"
          onChange={(e) => this.setState({longitude: e.target.value || ''})}
          placeholder="Longitude (0-180)"
          value={this.state.name}
        />
        <input type="submit" title="Submit" />
      </form>
    );
  }
}

AnswerSelection.propTypes = {
  questionId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
};

export default withRouter(graphql(INSERT_ANSWER)(AnswerSelection));
