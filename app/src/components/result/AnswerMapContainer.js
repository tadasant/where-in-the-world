import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import AnswerMap from './AnswerMap';

const AnswerSubscriptionContainer = (props) => {
    if (!props.data.Answer) {
        return null;
    }
    return <AnswerMap game={props.game} answer={props.data.Answer} />;
}

const GameSubscriptionContainer = (props) => {
    if (!props.data.Game) {
        return null;
    }

    const AnswerSubscriptionContainerWithData = withAnswerData(AnswerSubscriptionContainer);

    return <AnswerSubscriptionContainerWithData game={props.data.Game} gameId={props.gameId} />;
}

const ANSWER_SUBSCRIPTION = gql`
  subscription AnswerSubscription($gameId: uuid!) {
    Answer(where: { gameId: { _eq: $gameId } }) {
      latLocation
      longLocation
      playerID
    }
  }
`;

const GAME_SUBSCRIPTION = gql`
  subscription GameSubscription($gameId: uuid!) {
    Game(where: { id: { _eq: $gameId } }) {
      questions {
        latLocation
        longLocation
        location
      }
    }
}
`;

const withAnswerData = graphql(ANSWER_SUBSCRIPTION, {
    options: ({ gameId }) => ({
        variables: { gameId }
    })
});

const withGameData = graphql(GAME_SUBSCRIPTION, {
    options: ({ gameId }) => ({
        variables: { gameId }
    })
});


export default withGameData(GameSubscriptionContainer);


