import * as React from 'react';
import {graphql} from 'graphql';
import gql from 'gql';

const GAMES_QUERY = gql`
  query {
      Game {
          id
      }
  }
`;

const GameScreen = props => (
  <div>
    {props.data.Game && props.data.Game.id}
  </div>
);

const withGames = graphql(GAMES_QUERY, {
  options: ({ episode }) => ({
    variables: { episode }
  }),
});

export default withGames(GameScreen);
