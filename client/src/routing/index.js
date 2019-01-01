import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginContainer from '../modules/login/login/LoginContainer';
import RegisterContainer from '../modules/login/register/RegisterContainer';
import HomeContainer from '../modules/home/HomeContainer';
import PersonalZoneContainer from '../modules/personalZone/PersonalZoneContainer';
import NewMeetingContainer from '../modules/meetings/newMeeting/NewMeetingContainer';

class WeMeetRouting extends Component {
    render() {
        return <Router>
        <div id='router'>
            <Route path="/" exact component={LoginContainer} />
            <Route path="/register/" component={RegisterContainer} />
            <Route path="/home/" component={HomeContainer} />
            <Route path="/personalzone/" component={PersonalZoneContainer} />
            <Route path="/newMeeting/" component={NewMeetingContainer} />
        </div>
    </Router>
    }
}

export default WeMeetRouting;
