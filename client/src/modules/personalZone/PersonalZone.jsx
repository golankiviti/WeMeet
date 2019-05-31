import React, { useState, useEffect } from 'react';
import { List, fromJS } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LocationListContainer from './locations/LocationListContainer';
import MyMeetings from './meetings/myMeetings/MyMeetings';
import MeetingsForApprovalContainer from './meetingsForApproval/MeetingsForApprovalContainer';
import FutureMeetings from './futureMeetings/FutureMeetings';
import styles from './personalZone.module.scss';
import { getMeetingsForApproval, getMeetings, getFutureMeetings } from '../../clientManager/meetingsClientManager';
import { userLocations, getLocation } from '../../clientManager/userManager';
import classNames from 'classnames';
import { sleep } from '../../common';
import {
    meetingsForApproval as meetingsForApprovalKey,
    locations as locationsKey,
    myMeetings as myMeetingsKey,
    futureMeetings as futureMeetingsKey
} from '../../redux/refresh/refreshFields';
import { bindActionCreators } from 'redux';
import { registerRefresh, unregisterRefresh } from '../../redux/refresh/actionCreators';
import Icon from '@material-ui/core/Icon';

const propTypes = {
    userId: PropTypes.string,
    userName: PropTypes.string,
    locationsTimestamp: PropTypes.number,
    registerRefresh: PropTypes.func,
    unregisterRefresh: PropTypes.func,
}

function PersonalZone({
    userId,
    userName,
    registerRefresh,
    unregisterRefresh,
    meetingsForApprovalTimestamp,
    locationsTimestamp,
    myMeetingsTimestamp,
    futureMeetingsTimestamp
}) {
    const [meetingsForApproval, setMeetingsForApproval] = useState(List())
    const [locations, setLocations] = useState(List())
    const [myMeetings, setMyMeetings] = useState(List())
    const [futureMeetings, setFutureMeetings] = useState(List())
    const [isMeetingsForApprovalBusy, setIsMeetingsForApprovalBusy] = useState(false)
    const [isLocationsBusy, setIsLocationsBusy] = useState(false)
    const [isMyMeetingsBusy, setIsMyMeetingsBusy] = useState(false)
    const [isFutureMeetingsBusy, setIsFutureMeetingsBusy] = useState(false)

    useEffect(() => {
        registerRefresh(locationsKey)
        registerRefresh(futureMeetingsKey)
        registerRefresh(myMeetingsKey)
        registerRefresh(meetingsForApprovalKey)

        return () => {
            unregisterRefresh(locationsKey)
            unregisterRefresh(futureMeetingsKey)
            unregisterRefresh(myMeetingsKey)
            unregisterRefresh(meetingsForApprovalKey)
        }
    }, [])

    useEffect(() => {
        setIsMeetingsForApprovalBusy(true)
        sleep(1000, () => getMeetingsForApproval(userId)
            .then(res => {
                setMeetingsForApproval(fromJS(res))
                setIsMeetingsForApprovalBusy(false)
            })
        )

    }, [meetingsForApprovalTimestamp])

    useEffect(() => {
        setIsLocationsBusy(true)
        sleep(1000, () => userLocations(userId)
            .then(res => {
                setLocations(fromJS(res))
                setIsLocationsBusy(false)
            })
        )

    }, [locationsTimestamp])

    useEffect(() => {
        setIsMyMeetingsBusy(true)
        sleep(1000, () => getMeetings(userId)
            .then(res => {
                setMyMeetings(fromJS(res))
                setIsMyMeetingsBusy(false)
            })
        )

    }, [myMeetingsTimestamp])

    useEffect(() => {
        setIsFutureMeetingsBusy(true)
        sleep(1000, () => getFutureMeetings(userId)
            .then(res => {
                setFutureMeetings(fromJS(res))
                setIsFutureMeetingsBusy(false)
            })
        )

    }, [futureMeetingsTimestamp])

    const rightContainerClasses = classNames(styles.innerContainer, styles.right);
    const leftContainerClasses = classNames(styles.innerContainer, styles.left);

    return <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.name}>{`שלום, ${userName}`}</div>
            <div className={styles.headerIcons}>
                <div className={styles.headerIconItem}>
                    <div className={styles.iconAndLength}>
                        <Icon>access_time</Icon>
                        <div className={styles.length}>
                            {
                                meetingsForApproval &&
                                meetingsForApproval.size
                            }
                        </div>
                    </div>
                    <div className={styles.text}>
                        <div>פגישות הממתינות</div>
                        <div>לאישור</div>
                    </div>
                </div>
                <div className={styles.headerIconItem}>
                    <div className={styles.iconAndLength}>
                        <Icon>done</Icon>
                        <div className={styles.length}>
                            {
                                myMeetings &&
                                myMeetings.size
                            }
                        </div>
                    </div>
                    <div className={styles.text}>
                        פגישות עתידיות
                    </div>
                </div>
                <div className={styles.headerIconItem}>
                    <div className={styles.iconAndLength}>
                        <Icon>calendar_today</Icon>
                        <div className={styles.length}>
                            {
                                futureMeetings &&
                                futureMeetings.size
                            }
                        </div>
                    </div>
                    <div className={styles.text}>
                        <div>פגישות שטרם</div>
                        <div>שובצו</div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.cardsContainer}>
            <div className={rightContainerClasses}>
                <MeetingsForApprovalContainer meetings={meetingsForApproval} isBusy={isMeetingsForApprovalBusy} />
                <FutureMeetings meetings={futureMeetings} isBusy={isFutureMeetingsBusy} />
            </div>
            <div className={leftContainerClasses}>
                <MyMeetings meetings={myMeetings} isBusy={isMyMeetingsBusy} />
                <LocationListContainer locations={locations} isBusy={isLocationsBusy} />
            </div>
        </div>
    </div>
}

PersonalZone.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : '',
    userName: state.user ? state.user.get('firstName') : '',
    locationsTimestamp: state.refresh[locationsKey],
    futureMeetingsTimestamp: state.refresh[futureMeetingsKey],
    myMeetingsTimestamp: state.refresh[myMeetingsKey],
    meetingsForApprovalTimestamp: state.refresh[meetingsForApprovalKey]
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerRefresh,
        unregisterRefresh
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalZone);