import React from "react";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import PATHS from "../const/paths";

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 3em;
  line-height: 2em;
  color: #b276c8;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkButton = styled.a`
  font-size: 1.5em;
  font-weight: normal;
  margin: 0 32px;
  padding-bottom: 6px;
  &:hover {
    border-bottom: 3px solid #b276c8;
  }
`;

const Page404 = () => {
  return (
    <MainContainer maxWidth="sm">
      <p>404 Sorry about that.</p>
      <Title>Page not found.</Title>
      <ButtonsContainer>
        <LinkButton href={PATHS.HOME}>Go to Home</LinkButton>
      </ButtonsContainer>
    </MainContainer>
  );
};
export default Page404;
