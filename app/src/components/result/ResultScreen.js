import queryString from "query-string";
import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Header from "../header/Header";
import AnswerMap from "./AnswerMapContainer";
import GameImage from "./GameImage";
import Results from "./Results";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ResultsContainer = styled.div`
  @media (min-width: 1000px) {
    display: flex;
  }
`;

const ReturnButton = styled.button`
  background-color: #db6a3e;
  border-radius: 2px;

  font-size: 1em;
  width: 100%;
  margin: 0 auto;
  border-radius: 20px;
  border: none;
  padding: 0.5em 0.5em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #fff;
  cursor: pointer;
  box-shadow: 1px 1px 5.8px rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;

class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push("/game");
  }
  render() {
    const params = queryString.parse(window.location.search);
    const { gameid } = params;
    const hideReturn =
      this.props.data.Game && this.props.data.Game[0].state === "completed"
        ? false
        : true;

    console.log(gameid);
    return (
      <Fragment>
        <Header />
        <FlexContainer>
          <div>
            <h2 style={{ paddingLeft: ".3em" }}>Game Results</h2>
          </div>
          <div>
            {hideReturn ? null : (
              <ReturnButton onClick={this.handleClick}>Play Again</ReturnButton>
            )}
          </div>
        </FlexContainer>
        <ResultsContainer>
          <GameImage gameId={gameid} />
          <AnswerMap gameId={gameid} />
          <Results gameId={gameid} />
        </ResultsContainer>
      </Fragment>
    );
  }
}

const GAME_SUBSCRIPTION = gql`
  subscription GameSubscription($id: uuid!) {
    Game(where: { id: { _eq: $id } }) {
      state
    }
  }
`;

const withGame = graphql(GAME_SUBSCRIPTION, {
  options: () => {
    return {
      variables: { id: queryString.parse(window.location.search).gameid }
    };
  }
});

export default withGame(withRouter(ResultScreen));
