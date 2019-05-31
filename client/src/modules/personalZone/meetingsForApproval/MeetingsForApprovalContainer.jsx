import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MeetingsForApproval from './MeetingsForApproval';
import ImmutablePropTypes from 'immutable-prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, fromJS } from 'immutable';
import { registerRefresh, updateRefresh, unregisterRefresh } from '../../../redux/refresh/actionCreators';
import { meetingsForApproval as meetingsForApprovalKey, myMeetings as myMeetingsKey } from '../../../redux/refresh/refreshFields';
import { ACCPET_MEETING, REJECT_MEETING } from '../../../enums/meeting_response';
import { getMeetingsForApproval, responseToMeeting } from '../../../clientManager/meetingsClientManager';

const propTypes = {
    userId: PropTypes.string,
    timestamp: PropTypes.number,
    meetings: ImmutablePropTypes.List,
    isBusy: PropTypes.bool.isRequired,
    registerRefresh: PropTypes.func,
    updateRefresh: PropTypes.func,
    unregisterRefresh: PropTypes.func
};

function MeetingsForApprovalContainer(props) {
    const approveMeeting = (meetingId) => {
        responseToMeeting({
            userId: props.userId,
            meetingId,
            response: ACCPET_MEETING
        })
            .then(() => {
                props.updateRefresh(meetingsForApprovalKey)
                props.updateRefresh(myMeetingsKey)
            });
    }

    const declineMeeting = (meetingId) => {
        responseToMeeting({
            userId: props.userId,
            meetingId,
            response: REJECT_MEETING
        })
            .then(() => {
                props.updateRefresh(meetingsForApprovalKey)
            });
    }

    return <MeetingsForApproval meetings={props.meetings}
        isBusy={props.isBusy}
        onApprove={approveMeeting}
        onDecline={declineMeeting} />
}

MeetingsForApprovalContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : '',
    timestamp: state.refresh[meetingsForApprovalKey]
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerRefresh,
        updateRefresh,
        unregisterRefresh
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingsForApprovalContainer);