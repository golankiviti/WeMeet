import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';
import RTL from './rtl';
import { Routing } from './routing';
import * as serviceWorker from './serviceWorker';
import theme from './theme'
import { store, persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(<RTL>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MuiThemeProvider theme={theme}>
                <Routing />
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
</RTL>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
