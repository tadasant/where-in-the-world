import React, { Component } from "react";
import queryString from "query-string";
import Results from './Results';

class ResultScreen extends Component {
    render() {
        const params = queryString.parse(this.props.location.search);
        const { gameId } = params;
        console.log(gameId);
        return (
            <Results id={gameId} />
        );
    }
}


export default ResultScreen;
