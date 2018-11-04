import gql from 'graphql-tag';
import * as React from 'react';
import {graphql} from 'react-apollo';
import GameScreen from './GameScreen';
import Lobby from './Lobby';

const GAMES_QUERY = gql`
  subscription {
    # Game(where: { id: { _eq: "004c2fa1-a474-40a7-be52-633c6b613e26" } }) {
    Game(where: {state: {_eq: "live"}}) {
      id
      endDateTime
      questions {
        id
        imgURL
      }
    }
  }
`;

const GameScreenContainer = props => {
  if (!props.data || !props.data.Game || props.data.Game.length < 1) {
    return <Lobby/>;
  }
  if (props.data.Game.length > 1) {
    console.warn('Game length > 1');
  }
  if (!props.data.Game[0].questions) {
    console.error('Game should have a question.');
  }

  return <GameScreen game={props.data.Game[0]}/>
};

const withGames = graphql(GAMES_QUERY);

export default withGames(GameScreenContainer);
