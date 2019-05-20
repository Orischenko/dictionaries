import React   from 'react'
import PageWrapper from './PageWrapper'
import DictionaryFrom from '../forms/dictionaryFrom'
import {compose} from "redux"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import styled from "styled-components"
import Row from '../rows/Row'
import Modal from '../modal/Modal'
import { openModal } from '../actions'

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 60rem;
    margin: 0 auto 4rem;
  
    > div:not(:last-child) {
      margin-bottom: 15px;
    }
`;

const Loading = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%,-50%);
`;

const Error = styled.div`
  color: var(--color-error);
  margin: 10px 0;
  font-size: 10px;
`;

const ListPage = ({ dictionaries, requested, openModalId, openModal, error }) => {
    if (!requested) return <Loading>Loading...</Loading>;

    return (
        <PageWrapper
            title='dictionary list page'
            description='you can add, edit and delete your dictionaries'
        >
            <Wrapper>
                <>
                {requested && !dictionaries.length && <Error>You have no dictionaries</Error>}
                    {dictionaries.map(d => {
                        return (
                            <Row
                                key={d.id}
                                dictionary={d}
                                error={error}
                            />
                        );
                    })}
                </>
            </Wrapper>
            <button className='primary' onClick={() => openModal('addDictionary')}>Add dictionary</button>
            {openModalId === 'addDictionary' && (
                <Modal>
                    <h2>Add new dictionary</h2>
                    <DictionaryFrom />
                </Modal>
            )}
        </PageWrapper>
    );
};

export default compose(
    connect((state) => {
        const { firebase, firestore: {data, status}, dictionary: {deleteTodo, openModalId} } = state;
        const userId = firebase.auth.uid;

        return {
            userId,
            dictionaries: (data && data.dictionaries && data.dictionaries[userId] && data.dictionaries[userId].dictionaries) || [],
            requested: status.requested && status.requested[`dictionaries/${userId}`],
            //loading: deleteTodo.loading,
            openModalId: openModalId,
            error: deleteTodo.error,
        }
    }, { openModal }),
    firestoreConnect(props => [`dictionaries/${props.userId}`])
)(ListPage);