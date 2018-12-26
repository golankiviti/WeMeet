import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';
import RTL from './rtl';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux';
import LoginContainer from './modules/login/login/LoginContainer';
import theme from './theme'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


ReactDOM.render(<RTL>
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <div id='router'>
                    <Route path="/" exact component={LoginContainer} />
                    <Route path="/register/" component={() => <div>register</div>} />
                    <Route path="/users/" component={<div>users</div>} />
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
</RTL>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
