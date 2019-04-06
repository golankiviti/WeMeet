import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MeetingsForApproval from './MeetingsForApproval';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';

const propTypes = {
    userId: PropTypes.string
};

function MeetingsForApprovalContainer({userId}) {
    const [meetings, setMeetings] = useState(List());

}

MeetingsForApprovalContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

export default connect(mapStateToProps)(MeetingsForApprovalContainer);