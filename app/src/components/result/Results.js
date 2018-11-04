import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const RESULT_QUERY = gql`
  query getResults($id: uuid!) {
    Game(where: { id: { _eq: $id } }) {
      answers {
        player {
          name
        }
        result {
          score
        }
      }
    }
  }
`;

const rankResults = answers =>
  answers.sort((a, b) => b.result[0].score - a.result[0].score);

const Results = props => {
  if (props.data.loading) return <div>Loading....</div>;
  const rankedResults = rankResults(props.data.Game[0].answers);
  const resultsList = rankedResults.map((result, i) => (
    <li key={i}>
      {result.player.name} - {result.result[0].score}
    </li>
  ));

  return <ol>{resultsList}</ol>;
};

const withResults = graphql(RESULT_QUERY, {
  options: ({ id }) => ({
    variables: { id }
  })
});

export default withResults(Results);
