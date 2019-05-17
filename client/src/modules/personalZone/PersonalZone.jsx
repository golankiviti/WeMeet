import React, { Component } from 'react';
import LocationListContainer from './locations/LocationListContainer';
import MyMeetingsContainer from './meetings/myMeetings/MyMeetingsContainer';
import MeetingsForApprovalContainer from './meetingsForApproval/MeetingsForApprovalContainer';
import FutureMeetingsContainer from './futureMeetings/FutureMeetingsContainer';
import styles from './personalZone.module.scss';

class PersonalZone extends Component {
    render() {
        return <div className={styles.container}>
            <div className={styles.sideContainer}>
                <MeetingsForApprovalContainer />
                <LocationListContainer />
            </div>
            <div className={styles.sideContainer}>
                <MyMeetingsContainer />
                <FutureMeetingsContainer />
            </div>
        </div>
    }
}

export default PersonalZone; 