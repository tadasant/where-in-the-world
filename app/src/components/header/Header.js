import * as React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import logo from '../../assets/Logo.png';
import PlayerCount from './PlayerCount';
import UserName from './UserName';

const HeaderContainer = styled.div`
  height: 64px;
  background-color: #DB6A3E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  position: sticky;
  top: 0;
`;

const LogoImg = styled.img`
  max-height: 32px;
`;

const Header = props => (
  <HeaderContainer>
    <div>
      <PlayerCount/>
    </div>
    <div>
      <Link to="/"><LogoImg src={logo} /></Link>
    </div>
    <div>
      <UserName/>
    </div>
  </HeaderContainer>
);

export default Header;
