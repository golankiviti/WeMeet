import React, { useState, useEffect } from 'react';
import { List, fromJS } from 'immutable';
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
import { sleep } from '../../common';

const propTypes = {
    userId: PropTypes.string,
    userName: PropTypes.string
}

function PersonalZone({ userId }) {
    const [meetingsForApproval, setMeetingsForApproval] = useState(List())
    const [locations, setLocations] = useState(List())
    const [myMeetings, setMyMeetings] = useState(List())
    const [futureMeetings, setFutureMeetings] = useState(List())
    const [isBusy, setIsBusy] = useState(false)

    useEffect(() => {
        setIsBusy(true)
        sleep(1000, () => Promise.all([
            getMeetingsForApproval(userId),
            getMeetings(userId),
            userLocations(userId),
            getFutureMeetings(userId)
        ]).then(res => {
            setMeetingsForApproval(fromJS(res[0]))
            setLocations(fromJS(res[1]))
            setMyMeetings(fromJS(res[2]))
            setFutureMeetings(fromJS(res[3]))
            setIsBusy(false)
        }))
    }, [])

    const rightContainerClasses = classNames(styles.innerContainer, styles.right);
    const leftContainerClasses = classNames(styles.innerContainer, styles.left);

    return <div className={styles.container}>
        <div className={rightContainerClasses}>
            <MeetingsForApprovalContainer meetings={meetingsForApproval} isBusy={isBusy} />
            <FutureMeetingsContainer meetings={futureMeetings} isBusy={isBusy} />
        </div>
        <div className={leftContainerClasses}>
            <MyMeetingsContainer meetings={myMeetings} isBusy={isBusy} />
            <LocationListContainer locations={locations} isBusy={isBusy} />
        </div>
    </div>
}

PersonalZone.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : '',
    userName: state.user ? state.user.get('name') : ''
});

export default connect(mapStateToProps)(PersonalZone);