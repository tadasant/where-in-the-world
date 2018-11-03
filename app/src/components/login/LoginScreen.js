import * as React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const PLAYER_QUERY = gql`
    query {
        Player {
            id
        }
    }
`;

const LoginScreen = props => (
  <div>
    ID: {props.data.Player && props.data.Player.length > 0 && props.data.Player[0].id}
  </div>
);

const withResults = graphql(PLAYER_QUERY);

export default withResults(LoginScreen);
