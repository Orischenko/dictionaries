import React  from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik/dist/index'
import * as yup from 'yup'
import styled from "styled-components"
import FlatButton from "material-ui/FlatButton"
import {connect} from "react-redux"
import { postDictionary, editDictionary, closeModal } from "../actions"

const FormWrapper = styled.div`
  width: 100%;
  padding: 3rem 0 0;
  text-align: center;
  background-color: var(--color-white);
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledField = styled(Field)`
    padding: 1rem 0;
    width: 100%;
    color: var(--color-mainDark);
    border: none;
    border-bottom: 1px solid rgb(224, 224, 224);
    background: transparent;
    font-size: 1.4rem;
    border-radius: 2px;
    margin-bottom: 2px;
    
    &::placeholder {
      color: var(--color-mainLight);
    }
`;

const Message = styled.div`
  color: var(--color-error);
  padding: 0 1rem;
  font-size: 10px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Error = styled.div`
  color: var(--color-error);
  margin-bottom: 12px;
  font-size: 10px;
`;

const schema = yup.object().shape({
    name: yup.string().min(3, 'Too short name').max(25, 'Too long name').required('Name is required'),
    description: yup.string().min(10, 'Too short description'),
    complexity: yup.string().min(4, 'Too short complexity').max(11, 'Too long complexity').required('Сomplexity is required'),
    wordList: yup.string().required('Word list is required'),
    language: yup.string().required('Language is required').min(2, 'Only two characters').max(2, 'Only two characters'),
});

const dictionaryForm = ({ dictionary, postDictionary, editDictionary, closeModal, error }) => {
    const isDictionary = dictionary && Object.keys(dictionary).length;

    let initialValues = {
        name: '',
        description: '',
        complexity: '',
        wordList: '',
        language: '',
    };

    //for edit dictionary
    if (isDictionary) initialValues = dictionary;

    const btnLabel = isDictionary ? 'edit' : 'submit';
    const action = isDictionary ? editDictionary : postDictionary;

    return (
        <FormWrapper>
            <Formik
                initialValues={ initialValues }
                validationSchema={ schema }
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    await action(values);
                    setSubmitting(false);
                    resetForm();
                    closeModal();
                }}
            >
                {({ isSubmitting, isValid }) => (
                    <StyledForm>
                        <p>
                            <StyledField
                                type="text"
                                name="name"
                                placeholder="Dictionary name..."
                            />
                        </p>
                        <ErrorMessage name="name">{msg => <Message>{msg}</Message>}</ErrorMessage>
                        <p>
                            <StyledField
                                type="text"
                                name="description"
                                placeholder="Description..."
                            />
                        </p>
                        <ErrorMessage name="description">{msg => <Message>{msg}</Message>}</ErrorMessage>
                        <p>
                            <StyledField
                                type="text"
                                name="complexity"
                                placeholder="Complexity..."
                            />
                        </p>
                        <ErrorMessage name="complexity">{msg => <Message>{msg}</Message>}</ErrorMessage>
                        <p>
                            <StyledField
                                type="text"
                                name="wordList"
                                placeholder="Word list..."
                            />
                        </p>
                        <ErrorMessage name="wordList">{msg => <Message>{msg}</Message>}</ErrorMessage>
                        <p>
                            <StyledField
                                type="text"
                                name="language"
                                placeholder="Language..."
                            />
                        </p>
                        <ErrorMessage name="language">{msg => <Message>{msg}</Message>}</ErrorMessage>
                        {error && <Error>{error}</Error>}
                        <Flex>
                            <FlatButton
                                type='submit'
                                label={isSubmitting && isValid ? `${btnLabel}ting...` : btnLabel}
                                primary={true}
                                disabled={!isValid}
                            />
                            <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={() => closeModal()}
                            />
                        </Flex>
                    </StyledForm>
                )}
            </Formik>
        </FormWrapper>
    );
};

export default connect(
    (state) => {
        const { firebase, dictionary: {error} } = state;
        const userId = firebase.auth.uid;

        return {
            userId: userId,
            error: error,
        }
    },
    { postDictionary, editDictionary, closeModal }
)(dictionaryForm);

