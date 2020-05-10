import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Covid-19 Quebec</h1>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  height: 80px;
  background-color: #870000;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: #fff;
    margin: 0;
    font-size: 50px;
  }
`;

export default Header;
