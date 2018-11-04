import React, {Component, Fragment} from "react";
import queryString from "query-string";
import GameImage from './GameImage';
import Results from './Results';

class ResultScreen extends Component {
    render() {
        const params = queryString.parse(window.location.search);
        const { gameid } = params;
        console.log(gameid);
        return (
          <Fragment>
              {/* Image */}
              <GameImage gameId={gameid}/>
              {/* Map */}
            <Results id={gameid} />
          </Fragment>
        );
    }
}


export default ResultScreen;
