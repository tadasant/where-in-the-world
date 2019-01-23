import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, Component} from 'react';
import {graphql} from 'react-apollo';
import {BrowserRouter, Route} from 'react-router-dom';
import GameScreen from './game/GameScreenContainer';
import LoginScreen from './login/LoginScreen';
import ResultScreen from './result/ResultScreen';

const updatePlayerSeend = gql`
    mutation UpdatePlayer($id: uuid!, $lastSeenDate: timestamptz!) {
        update_Player(
            where: {id: {_eq: $id}},
            _set: {lastSeen: $lastSeenDate}
        ) {
            affected_rows
        }
    }
`;

class Routing extends Component {
  componentDidMount() {
    if (!this.props.mutate) {
      console.error('No mutation error code 5879342785');
    }

    if (localStorage.getItem('witw-playerId')) {
      this.props.mutate({ variables: { id: localStorage.getItem('witw-playerId'), lastSeenDate: new Date().toISOString() } })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path='/' exact component={LoginScreen}/>
          <Route path='/game' exact component={GameScreen}/>
          <Route path='/results' exact component={ResultScreen}/>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default graphql(updatePlayerSeend)(Routing);
