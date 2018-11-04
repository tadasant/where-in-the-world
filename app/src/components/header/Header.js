import * as React from 'react';
import styled from 'styled-components';
import logo from '../../assets/Logo.png';

const HeaderContainer = styled.div`
  height: 64px;
  background-color: #DB6A3E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;

const LogoImg = styled.img`
  max-height: 32px;
`;

const Header = props => (
  <HeaderContainer >
    <div>
      Player count
    </div>
    <div>
      <LogoImg src={logo}/>
    </div>
    <div>
      User name
    </div>
  </HeaderContainer>
);

export default Header;
