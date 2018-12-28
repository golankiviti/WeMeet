import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';
import RTL from './rtl';
import WeMeetRouting from './routing';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux';
import theme from './theme'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


ReactDOM.render(<RTL>
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <WeMeetRouting />
        </MuiThemeProvider>
    </Provider>
</RTL>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
