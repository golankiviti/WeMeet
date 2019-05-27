import React, { useState, useEffect } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LocationListContainer from './locations/LocationListContainer';
import MyMeetingsContainer from './meetings/myMeetings/MyMeetingsContainer';
import MeetingsForApprovalContainer from './meetingsForApproval/MeetingsForApprovalContainer';
import FutureMeetingsContainer from './futureMeetings/FutureMeetingsContainer';
import styles from './personalZone.module.scss';
import { getMeetingsForApproval, getMeetings, getFutureMeetings } from '../../clientManager/meetingsClientManager';
import { userLocations } from '../../clientManager/userManager';
import classNames from 'classnames';

const propTypes = {
    userId: PropTypes.string
}
function PersonalZone({ userId }) {
    const [meetingsForApproval, setMeetingsForApproval] = useState(List())
    const [locations, setLocations] = useState(List())
    const [myMeetings, setMyMeetings] = useState(List())
    const [futureMeetings, setFutureMeetings] = useState(List())

    useEffect(() => {
        Promise.all([
            getMeetingsForApproval(userId),
            getMeetings(userId),
            userLocations(userId),
            getFutureMeetings(userId)
        ]).then(res => {
            setMeetingsForApproval(List(res[0]))
            setLocations(List(res[1]))
            setMyMeetings(List(res[2]))
            setFutureMeetings(List(res[3]))
        })
    }, [])

    const rightContainerClasses = classNames(styles.innerContainer, styles.right);
    const leftContainerClasses = classNames(styles.innerContainer, styles.left);

    return <div className={styles.container}>
        <div className={rightContainerClasses}>
            <MeetingsForApprovalContainer />
            <FutureMeetingsContainer />
        </div>
        <div className={leftContainerClasses}>
            <MyMeetingsContainer />
            <LocationListContainer />
        </div>
    </div>
}

PersonalZone.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

export default connect(mapStateToProps)(PersonalZone);