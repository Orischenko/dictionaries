import React, { useEffect } from 'react'
import { connect } from "react-redux"
import * as actions from '../actions'

const LogoutPage = ({ logout }) => {
    useEffect(() => {
        logout();
    }, [logout]);
    return <div/>;
};

export default connect(
    null,
    { logout: actions.signOut }
)(LogoutPage)