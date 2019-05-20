import React from 'react'
import styled, { withTheme } from 'styled-components'
import SvgIcon from 'material-ui/SvgIcon';
import {deleteDictionary, openModal} from "../actions"
import { connect } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media ${({ theme }) => theme.mediaQueries.smallest} {
    justify-content: center;
  }
  
  i {
    font-style: normal;
    cursor: pointer;
    margin: 0;
    height: 100%;
    width: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media ${({ theme }) => theme.mediaQueries.smallest} {
      width: calc(50% - 15px);
      height: 30px;
    }
    
    svg { 
      transition: all .3s ease-in;
      
      path {
        color: var(--color-white);
      }
    }
    
    &:hover {
      svg {
        transform: translateY(-5px);
        transition: all .25s ease-out;
      }
    }
  }
`;

const EditIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
);

const DeleteIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
);

const Controls = ({ theme, dictionaryId, openModal, deleteDictionary }) => {
    return (
        <Wrapper>
            <i className="material-icons" style={{backgroundColor: theme.colors.accent1}}>
                <EditIcon color={theme.colors.white} onClick={() => openModal(dictionaryId)}/>
            </i>
            <i className="material-icons" style={{backgroundColor: theme.colors.accent4}}>
                <DeleteIcon color={theme.colors.white} onClick={() => deleteDictionary(dictionaryId)}/>
            </i>
        </Wrapper>
    );
};

export default withTheme(connect(
    null,
    { deleteDictionary, openModal }
)(Controls));