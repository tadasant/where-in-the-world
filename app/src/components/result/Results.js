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
  if (props.data.loading || !props.data.Game) {
    return null;
  }

  const answers = props.data.Game[0].answers;
  const allResultsReady = answers.every(answer => answer.result && answer.result.length === 1);
  if (allResultsReady) {
    rankResults(answers);
  }

  const resultsList = answers.map((answer, i) => (
    <li key={i}>
      {answer.player.name} - {answer.result.length > 0 ? answer.result[0].score : 'Calculating...'}
    </li>
  ));

  return <ol>{resultsList}</ol>;
};

const withResults = graphql(RESULT_QUERY, {
  options: ({ gameId }) => ({
    variables: { id: gameId }
  })
});

export default withResults(Results);
