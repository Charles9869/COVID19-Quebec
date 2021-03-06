import React from 'react';
import styled from 'styled-components';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <div style={{ display: 'flex' }}>
          <a href='https://www.linkedin.com/in/charles-bertrand-105068195/'>
            <AiFillLinkedin fontSize={30} />
          </a>
          <a href='https://github.com/Charles9869'>
            <AiFillGithub fontSize={30} />
          </a>
        </div>
        <div>
          <p>&copy; 2020 Charles Bertrand all rights reserved.</p>
        </div>
      </Container>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #870000;
  color: #fff;
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 0 auto;
  margin: 50px auto 0px auto;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    margin: 0px 10px;
    color: #fff;
  }
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`;

export default Footer;
