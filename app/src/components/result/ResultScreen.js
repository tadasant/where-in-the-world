import queryString from "query-string";
import React, {Component, Fragment} from "react";
import Header from '../header/Header';
import AnswerMap from './AnswerMap';
import GameImage from './GameImage';
import Results from './Results';

class ResultScreen extends Component {
  render() {
    const params = queryString.parse(window.location.search);
    const {gameid} = params;
    console.log(gameid);
    return (
      <Fragment>
        <Header/>
        <GameImage gameId={gameid}/>
        <AnswerMap gameId={gameid}/>
        <Results gameId={gameid}/>
      </Fragment>
    );
  }
}


export default ResultScreen;
