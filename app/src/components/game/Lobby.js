import * as React from 'react';
import Header from '../header/Header';
import styled from "styled-components";

const WaitText = styled.h3`
  position: fixed;
  color: #fff;
  width: 100%;
  padding: 10%;
  margin: 10rem auto;
  text-align: center;
`;

const Lobby = () => (
  <div>
    <div>
      <Header/>
    </div>
    <div>
      <WaitText>
        Please wait while we prepare a game for you...
      </WaitText>
    </div>
  </div>
);

export default Lobby;
