import gql from 'graphql-tag';
import * as React from 'react';
import {graphql} from 'react-apollo';

const GAMES_QUERY = gql`
    subscription {
        Game(where: {state: {_eq: "live"}}) {
            id
        }
    }
`;

const GameScreen = props => (
  <div>
    Games:<br/>
    {
      props.data && props.data.Game ? props.data.Game.map(game => (
          <div>
            {game.id}
          </div>
        )) : null
    }
  </div>
);

const withGames = graphql(GAMES_QUERY);

export default withGames(GameScreen);
