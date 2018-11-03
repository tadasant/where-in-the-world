import * as React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const GAMES_QUERY = gql`
    subscription {
        Game(where: {state: {_eq: "live"}}) {
            id
        }
    }
`;

const GameScreen = props => (
  <div>
    ID: {props.data.Game && props.data.Game[0].id}
  </div>
);

const withGames = graphql(GAMES_QUERY);

export default withGames(GameScreen);
