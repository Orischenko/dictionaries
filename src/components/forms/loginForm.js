import React  from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik/dist/index'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from "react-redux";
import { signUp, signIn } from "../actions";

const FormWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  background-color: var(--color-white);
  margin-bottom: 30px;
  box-shadow: var(--shadow) 0px 1px 6px, var(--shadow) 0px 1px 4px;
  
    @media ${({ theme }) => theme.mediaQueries.small} {
      max-width: 40rem;
    }
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

const Error = styled.div`
  color: var(--color-error);
  margin-bottom: 12px;
`;

const LoginSingUpForm = ({ type, schema, loading, error, signUp, signIn }) => {
    const message = type === 'login' ? 'LoginPage' : 'Sign up';

    const initialValues = Object.keys(schema.fields).reduce((accum, curr) => {
        return {...accum, [curr]: ''};
    }, {});

    const action = type === 'signup' ? signUp : signIn;

    return (
        <FormWrapper>
            <h1>{ message } into your acount</h1>
            <Formik
                initialValues={ initialValues }
                validationSchema={ schema }
                onSubmit={async (values, { setSubmitting }) => {
                    await action(values);
                    setSubmitting(false);
                }}
            >

                {({ isSubmitting, isValid }) => (
                    <StyledForm>
                        {type === 'signup' && (
                            <>
                                <p>
                                    <StyledField
                                        type="firstName"
                                        name="firstName"
                                        placeholder="First name..."
                                    />
                                </p>
                                <ErrorMessage name="firstName">{msg => <Message>{msg}</Message>}</ErrorMessage>
                                <p>
                                    <StyledField
                                        type="lastName"
                                        name="lastName"
                                        placeholder="Last name..."
                                    />
                                </p>
                                <ErrorMessage name="lastName">{msg => <Message>{msg}</Message>}</ErrorMessage>
                            </>
                        )}
                        <p>
                            <StyledField
                                type="email"
                                name="email"
                                placeholder="Email..."
                            />
                        </p>
                        <ErrorMessage name="email">{msg => <Message>{msg}</Message>}</ErrorMessage>
                        <p>
                            <StyledField
                                type="password"
                                name="password"
                                placeholder="Password..."
                                autoComplete="current-password"
                            />
                        </p>
                        <ErrorMessage name="password">{msg => <Message>{msg}</Message>}</ErrorMessage>
                        {type === 'signup' && (
                            <>
                                <p>
                                    <StyledField
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Re-type password..."
                                        autoComplete="current-password"
                                    />
                                </p>
                                <ErrorMessage name="confirmPassword">{msg => <Message>{msg}</Message>}</ErrorMessage>
                            </>
                        )}
                        {error && <Error>{error}</Error>}
                        <RaisedButton
                            type='submit'
                            disabled={!isValid}
                            label={loading ? 'loading...' : message}
                            primary={true}
                            style={{marginTop: '30px'}}
                        />
                    </StyledForm>
                )}
            </Formik>
        </FormWrapper>
    );
};

export default
connect(
    (state) => {
        const { auth } = state;

         return {
            loading: auth.loading,
            error: auth.error,
        }
    },
    { signUp, signIn }
)(LoginSingUpForm)