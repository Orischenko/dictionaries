import React from 'react'
import MenuItem from './MenuItem'
import { connect } from "react-redux"
import { clear } from '../actions'

const Menu = ({ isLogged, clear }) => {
    return (
        <nav>
            <ul>
                {isLogged && (
                    <>
                        <MenuItem link='/home'>home</MenuItem>
                        <MenuItem link='/logout'>logout</MenuItem>
                    </>
                )}
                {!isLogged && (
                    <>
                        <MenuItem link='/login' onClick={() => clear() }>login</MenuItem>
                        <MenuItem link='/signup' onClick={() => clear() }>sign up</MenuItem>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default connect(
    (state) => {
        const { firebase } = state;

        return {
            isLogged: firebase.auth.uid
        }
    },
    { clear }
)(Menu)

