import React  from 'react'
import styled from "styled-components";
import Controls from "./Controls";
import Modal from '../modal/Modal'
import DictionaryFrom from "../forms/dictionaryFrom";
import {openModal} from '../actions'
import {connect} from "react-redux";
import { NavLink } from 'react-router-dom'

const Wrapper = styled.div`
    position: relative;
    text-align: left;
    display: flex;
    justify-content: space-between;
    background-color: var(--color-white);
    transition: all .5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    box-shadow: 0 1px 30px rgba(0,0,0,0.13);
    
    &:nth-child(4n+1) {
      &:before { background-color: var(--color-accent1); }
      a:hover { color: var(--color-accent1); }
    }
    &:nth-child(4n+2) {
      &:before { background-color: var(--color-accent2); }
      a:hover { color: var(--color-accent2); }
    }
    &:nth-child(4n+3) {
      &:before { background-color: var(--color-accent3); }
      a:hover { color: var(--color-accent3); }
    }
    &:nth-child(4n+4) {
      &:before { background-color: var(--color-accent4); }
      a:hover { color: var(--color-accent4); }
    }
    
    &:before {
      content: '';
      position: absolute;
      width: 3px;
      height: calc(100% - 30px);
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      
      @media ${({ theme }) => theme.mediaQueries.smallest} {
        height: 3px;
        width: calc(100% - 30px);
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    
    ul {
        font-size: 12px;
        line-height: 1em;
        display: flex;
        align-items: center;
        color: var(--color-primary);
        
        li {
            color: var(--color-white);
            padding: 2px 7px;
            
            &:not(:last-child) {
              margin-right: 2px;
            }
            
            &:nth-child(4n+1) {
              background-color: var(--color-accent1);
            }
            &:nth-child(4n+2) {
              background-color: var(--color-accent2);
            }
            &:nth-child(4n+3) {
              background-color: var(--color-accent3);
            }
            &:nth-child(4n+4) {
              background-color: var(--color-accent4);
            }
        }
    }
    
    @media ${({ theme }) => theme.mediaQueries.smallest} {
        flex-direction: column;
    }
`;

const Link = styled(NavLink)`
    font-size: 1.75rem;
    line-height: 1em;
    font-weight: 400;
    margin-bottom: 5px;
    text-transform: capitalize;
    color: var(--color-mainDark);
    transition: all .25s ease-out;
`;

const Info = styled.div`
  padding: 2rem 2rem 1.5rem;
  
  @media ${({ theme }) => theme.mediaQueries.smallest} {
    padding-bottom: 3rem;
  }
`;

const Error = styled.div`
  color: var(--color-error);
  margin: 10px 0;
  font-size: 10px;
`;

const Row = ({ dictionary, openModalId, error }) => {
    const { id, name, description, complexity, wordList, language } = dictionary;

    return (
        <Wrapper>
            <Info>
                <Link exact to={`/view/${id}`}>
                    {name}
                </Link>
                <h4>{description}</h4>
                <ul>
                    <li>{complexity}</li>
                    <li>{wordList.split(' ').length} words</li>
                    <li>{language}</li>
                </ul>
            </Info>
            <Controls dictionaryId={id} />

            {error && <Error>{error}</Error>}
            {dictionary.id === openModalId && (
                <Modal>
                    <h2>modal {name}</h2>
                    <DictionaryFrom dictionary={dictionary} />
                </Modal>
            )}
        </Wrapper>
    );
};

export default connect(
    (state) => {
        const { dictionary: {openModalId} } = state;

        return {
            openModalId: openModalId,
        }
    },
    { openModal }
)(Row);