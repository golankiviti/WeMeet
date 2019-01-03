import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from '../modules/login/login/LoginContainer';
import RegisterContainer from '../modules/login/register/RegisterContainer';
import HomeContainer from '../modules/home/HomeContainer';
import PersonalZoneContainer from '../modules/personalZone/PersonalZoneContainer';
import Shell from '../modules/shell/Shell';
import history from './history';

class Routing extends Component {
    render() {
        return <Router>
        <Shell>
        <Switch>
                <Route path="/" exact component={LoginContainer} />
                <Route path="/register/" component={RegisterContainer} />
                <Route path="/home/" component={HomeContainer} />
                <Route path="/personalzone/" component={PersonalZoneContainer} />
            </Switch>
        </Shell>
        </Router>
    }
}

export default Routing;
