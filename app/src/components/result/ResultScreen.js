import queryString from "query-string";
import React, { Component, Fragment } from "react";
import Header from "../header/Header";
import AnswerMap from "./AnswerMap";
import GameImage from "./GameImage";
import Results from "./Results";
import styled from "styled-components";

const ResultsContainer = styled.div`
  @media (min-width: 1000px) {
    display: flex;
  }
`;

class ResultScreen extends Component {
  render() {
    const params = queryString.parse(window.location.search);
    const { gameid } = params;
    console.log(gameid);
    return (
      <Fragment>
        <Header />
        <h2 style={{ paddingLeft: ".3em" }}>Game Results</h2>
        <ResultsContainer>
          <GameImage gameId={gameid} />
          <AnswerMap gameId={gameid} />
          <Results gameId={gameid} />
        </ResultsContainer>
      </Fragment>
    );
  }
}

export default ResultScreen;
