import React from 'react'
import styled from 'styled-components'
import Navbar from './navbar/Navbar'

const Content = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = ({ children }) => {
    return (
        <>
            <Navbar/>
            <Content>{ children }</Content>
        </>
    );
};

export default Main;