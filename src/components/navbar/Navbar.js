import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";
import Menu from './Menu'

const Wrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-borderColor);
  
  * {
    margin: 0;
  }

  ul {
    display: flex;
    
    li {
      margin: 0 3px;
      
        &:nth-child(4n+1) a.active:after, &:nth-child(4n+1) a:hover:after {
          background-color: var(--color-accent1);
        }
        &:nth-child(4n+2) a.active:after, &:nth-child(4n+2) a:hover:after {
          background-color: var(--color-accent2);
        }
        &:nth-child(4n+3) a.active:after, &:nth-child(4n+3) a:hover:after {
          background-color: var(--color-accent3);
        }
        &:nth-child(4n+4) a.active:after, &:nth-child(4n+4) a:hover:after {
          background-color: var(--color-accent4);
        }
    }
  }
`;

const Navbar = ({ name }) => {
    return (
        <Wrapper>
            <h1>Hello, <b>{name || ' stranger'}</b></h1>
            <Menu />
        </Wrapper>
    );
};

export default connect(
    (state) => {
        const { firebase: {profile} } = state;

        return {
            name: profile.firstName
        }
    },
    null
)(Navbar)