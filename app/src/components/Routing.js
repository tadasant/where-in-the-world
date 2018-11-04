import * as React from 'react';
import {Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import GameScreen from './game/GameScreenContainer';
import LoginScreen from './login/LoginScreen';
import ResultScreen from './result/ResultScreen';

const Routing = () => (
  <BrowserRouter>
    <Fragment>
      <Route path='/' exact component={LoginScreen}/>
      <Route path='/game' exact component={GameScreen}/>
      <Route path='/results' exact component={ResultScreen}/>
    </Fragment>
  </BrowserRouter>
);

export default Routing;
