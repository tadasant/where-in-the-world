import * as React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const RESULT_QUERY = gql`
    query {
        Result {
            id
        }
    }
`;

const ResultScreen = props => (
  <div>
    ID: {props.data.Result && props.data.Result.length > 0 && props.data.Result[0].id}
  </div>
);

const withResults = graphql(RESULT_QUERY);

export default withResults(ResultScreen);
