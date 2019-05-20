import React from 'react'
import LoginSingUpForm from '../forms/loginForm';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().min(3, 'Too short name').max(25, 'Too long name').required('The email is required'),
    lastName: yup.string().min(3, 'Too short name').max(25, 'Too long name').required('The email is required'),
    email: yup.string().email('Invalid email').required('The email is required'),
    password: yup.string().required('The password is required').min(8, 'The password is to short'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], "Password doesn't match")
        .required('You need to confirm your password'),
});

const SignUpPage = () => {
    return <LoginSingUpForm type='signup' schema={schema} />
};

export default SignUpPage;