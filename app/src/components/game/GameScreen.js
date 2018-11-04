import PropTypes from 'prop-types';
import * as React from 'react';
import {Component} from 'react';
import {withRouter} from 'react-router-dom';

class GameScreen extends Component {
  componentDidMount() {
    const {game} = this.props;
    const pushToResults = () => this.props.history.push(`/results?gameid=${game.id}`);
    const endDateTime = new Date(game.endDateTime);
    const currentDateTime = new Date();

    if (endDateTime < currentDateTime) {
      pushToResults();
    } else {
      setTimeout(pushToResults, endDateTime - currentDateTime);
    }
  }

  render() {
    const {game} = this.props;
    return (
      <div>
        Game:<br/>
        <div>
          ID: {game.id}<br/>
          endDateTime: {game.endDateTime}<br/>
          questionId: {game.questions.id}<br/>
          questionImage: <img src={game.questions.imgURL}/>
        </div>
        }
      </div>
    )
  }
}

GameScreen.propTypes = {
  game: PropTypes.object
};

export default withRouter(GameScreen);
