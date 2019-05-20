import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledNavLink = styled(NavLink)`
  font-size: 13px;
  transition: all .15s ease-out;
  position: relative;
  color: var(--color-main);
  padding: 20px 10px;
  height: 100%;
  display: block;
  cursor: pointer;
  
  &:after {
    content: '';
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    transform: translate(-50%, 1px);
    transition: all .25s ease-out;
  }
  
    &.active:after, &:hover:after {
        width: 100%;
    }
`;

const MenuItem = ({ link, children, onClick }) => {
    return (
        <li>
            <StyledNavLink
                exact
                activeClassName='active'
                to={link}
                onClick={onClick}
            >
                {children}
            </StyledNavLink>
        </li>
    );
};

export default MenuItem;