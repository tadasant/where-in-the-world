import * as React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const GAMES_QUERY = gql`
  query {
      Game {
          id
      }
  }
`;

const GameScreen = props => (
  <div>
    ID: {props.data.Game && props.data.Game[0].id}
  </div>
);

const withGames = graphql(GAMES_QUERY, {
  options: ({ episode }) => ({
    variables: { episode }
  }),
});

export default withGames(GameScreen);
