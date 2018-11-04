import * as React from 'react';
import styled from "styled-components";

const LoginHeader = styled.div`
  position: fixed;
  width: 100%;
  background: #ec8d1e;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  margin: 0.6em 0em;
  font-size: 1.3em;
  text-transform: uppercase;
`;

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
      <LoginHeader>
        <Title>Where in the world?</Title>
      </LoginHeader>
    </div>
    <div>
      <WaitText>
        Please wait while we prepare a game for you...
      </WaitText>
    </div>
  </div>
);

export default Lobby;
