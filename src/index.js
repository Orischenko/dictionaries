import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import theme from './styles/theme'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store'

const root = document.getElementById('root');

ReactDOM.render(<div>Loading...</div>, root);
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider>
                    <ThemeProvider theme={theme}>
                        <>
                            <App/>
                            <GlobalStyles/>
                        </>
                    </ThemeProvider>
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>,
        root
    );
});