import PropTypes from "prop-types";
import {Fragment} from 'react';
import * as React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from '../header/Header';
import AnswerSelection from "./AnswerSelection";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";

const GameScreenStyled = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Question = styled.div`
  flex: 0 1 auto;
`;

const QuestionTitle = styled.h2`
  color: #fff;
  padding: 0 0.5em;
  font-size: 1.3em;
`;

const QuestionImage = styled.img`
  width: 100%;
  flex: 0 1 auto;
`;

const AnswerContainer = styled.div`
  flex: 1 1 auto;
`;

class GameScreen extends Component {
  componentDidMount() {
    const { game } = this.props;
    const pushToResults = () =>
      this.props.history.push(`/results?gameid=${game.id}`);
    const endDateTime = new Date(game.endDateTime);
    const currentDateTime = new Date();

    if (endDateTime < currentDateTime) {
      pushToResults();
    } else {
      setTimeout(pushToResults, endDateTime - currentDateTime);
    }
  }

  render() {
    const { game } = this.props;
    console.log("game", game);
    return (
      <Fragment>
        <Header/>
        <GameScreenStyled>
          {/* ID: {game.id}<br/> */}
          {/* endDateTime: {game.endDateTime}<br/> */}
          {/* questionId: {game.questions.id}<br/> */}
          <Question>
            <QuestionTitle>Where in the world is the photo?</QuestionTitle>
            <QuestionImage src={game.questions.imgURL} />
          </Question>
          <AnswerContainer>
            <AnswerSelection questionId={game.questions.id} gameId={game.id} />
          </AnswerContainer>
          <ProgressBar endDateTime={game.endDateTime} />
        </GameScreenStyled>
      </Fragment>
    );
  }
}

GameScreen.propTypes = {
  game: PropTypes.object
};

export default withRouter(GameScreen);
