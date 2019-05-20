import React from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import styled from 'styled-components'
import PageWrapper from './PageWrapper'
import Modal from '../modal/Modal'
import { openModal } from '../actions'
import DictionaryFrom from "../forms/dictionaryFrom";

const Loading = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%,-50%);
`;

const Content = styled.div`
  text-align: left;
  margin-bottom: 30px;
`;

const Label = styled.div`
    background-color: var(--color-accent1);
    color: var(--color-white);
    display: inline-block;
    font-size: 1.3rem;
    padding: 0 10px;
    margin-bottom: 3rem;
`;

const UL = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 1.2rem;
    
    @media ${({ theme }) => theme.mediaQueries.small} {
      grid-template-columns: repeat(3, 1fr);
    }
`;

const Error = styled.div`
  color: var(--color-error);
  margin: 10px 0;
  font-size: 10px;
`;

const ViewPage = ({ dictionary, openModalId, openModal, requested }) => {
    const { id, name='', description='', complexity='', wordList='' } = dictionary;

    if (!requested) return <Loading>Loading...</Loading>;
    if (requested && !Object.keys(dictionary).length) return <Error>Dictionary id is incorrect</Error>;

    return (
        <PageWrapper
            title={`${name} dictionary view page`}
            description='you can view and edit your dictionary'
        >
            <Content>
                <h3>{name}</h3>
                <h5>{description}</h5>
                <Label>{complexity}</Label>
                <UL>
                    {wordList.match(/[а-яa-z]+/gi).map(word => {
                        return (
                            <li key={word}>{word}</li>
                        );
                    })}
                </UL>
            </Content>
            <button className='primary' onClick={() => openModal(id)}>Edit dictionary</button>

            {openModalId === id && (
                <Modal>
                    <h2>modal {name}</h2>
                    <DictionaryFrom dictionary={dictionary} />
                </Modal>
            )}
        </PageWrapper>
    );
};

export default compose(
    connect((state, props) => {
        const { firebase, firestore: {data, status}, dictionary: {openModalId} } = state;
        const { match: {params} } = props;
        const userId = firebase.auth.uid;

        return {
            userId,
            dictionary: (data && data.dictionaries && data.dictionaries[userId] && data.dictionaries[userId].dictionaries
                .find(d => d.id === params.id)) || {},
            requested: status.requested && status.requested[`dictionaries/${userId}`],
            openModalId: openModalId,
        }
    }, { openModal }),
    firestoreConnect(props => [`dictionaries/${props.userId}`])
)(ViewPage);