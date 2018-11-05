import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const ResultStyled = styled.li`
  margin: .6em 0;
  & > span:last-child  {
    float: right;
    padding-right: 1em;
    
  }
`;

const RESULT_QUERY = gql`
  subscription getResults($id: uuid!) {
    Game(where: { id: { _eq: $id } }) {
      answers {
        id
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
  answers.sort((a, b) => a.result[0].score - b.result[0].score);

const Results = props => {
  if (props.data.loading || !props.data.Game) {
    return null;
  }

  const answers = props.data.Game[0].answers.map(answer => {
    if (answer.result.length !== 1) {
      answer.result.push({ score: Infinity });
    }
    return answer;
  });

  const rankedAnswers = rankResults(answers);

  const resultsList = rankedAnswers.map((answer, i) => (
    <ResultStyled key={i}>
      <span>{answer.player.name}</span>
      <span>
        {answer.result[0].score !== Infinity
          ? `${answer.result[0].score.toLocaleString()} km`
          : "Calculating..."}
      </span>
    </ResultStyled>
  ));

  return <ol style={{ flexBasis: "640px"}}>{resultsList}</ol>;
};

const withResults = graphql(RESULT_QUERY, {
  options: ({ gameId }) => ({
    variables: { id: gameId }
  })
});

export default withResults(Results);
