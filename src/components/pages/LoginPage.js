import React from 'react'
import LoginSingUpForm from '../forms/loginForm'
import * as yup from 'yup'

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('The email is required'),
    password: yup.string().required('The password is required').min(8, 'The password is to short'),
});

const LoginPage = () => {
    return <LoginSingUpForm type='login' schema={schema} />
};

export default LoginPage