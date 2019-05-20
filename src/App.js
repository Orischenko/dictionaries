import React from 'react'
import Main from './components/main'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LoginPage, Logout, SignUpPage, DictList, DictView } from './components/pages'
import { connect } from "react-redux";

const App = ({ isLogged }) => {
    return (
        <Main>
            {isLogged ? (
                <Switch>
                    <Route path='/home' component={DictList}></Route>
                    <Route exact path='/view/:id' component={DictView}></Route>
                    <Route exact path='/logout' component={Logout}></Route>
                    <Redirect to='/home' />
                </Switch>
            ) : (
                <Switch>
                    <Route exact path='/login' component={LoginPage}></Route>
                    <Route exact path='/signup' component={SignUpPage}></Route>
                    <Redirect to='/login' />
                </Switch>
            )}
        </Main>
    );
};

export default connect(
    (state) => {
        const { firebase } = state;

        return {
            isLogged: firebase.auth.uid
        }
    },
    null
)(App)