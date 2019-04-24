import React, { Component } from 'react';
import LocationListContainer from './locations/LocationListContainer';
import MyMeetingsContainer from './meetings/myMeetings/MyMeetingsContainer';
import MeetingsForApprovalContainer from './meetingsForApproval/MeetingsForApprovalContainer';
import styles from './personalZone.module.scss';

class PersonalZone extends Component {
    render() {
        return <div className={styles.container}>
            <LocationListContainer />
            <MyMeetingsContainer />
        </div>
    }
}

export default PersonalZone; 