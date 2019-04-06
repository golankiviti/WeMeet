import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MeetingsForApproval from './MeetingsForApproval';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';
import { ACCPET_MEETING, REJECT_MEETING } from '../../../enums/meeting_response';
import { getMeetingsForApproval, responseToMeeting } from '../../../clientManager/meetingsClientManager';

const propTypes = {
    userId: PropTypes.string
};

function MeetingsForApprovalContainer({userId}) {
    const [meetings, setMeetings] = useState(List());

    // componentDidMount
    useEffect(() => {
        getMeetingsForApproval(userId)
        .then(res => {debugger;setMeetings(fromJS(res))})
    }, []);

    const approveMeeting = (meetingId) => {
        responseToMeeting({
            userId,
            meetingId,
            response: ACCPET_MEETING
        });
    }

    const declineMeeting = (meetingId) => {
        responseToMeeting({
            userId,
            meetingId,
            response: REJECT_MEETING
        });
    }

    return <MeetingsForApproval meetings={meetings}
        onApprove={approveMeeting}
        onDecline={declineMeeting} />
}

MeetingsForApprovalContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

export default connect(mapStateToProps)(MeetingsForApprovalContainer);