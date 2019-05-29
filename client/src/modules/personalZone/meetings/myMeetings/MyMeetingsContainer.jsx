import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'immutable-prop-types';
import { bindActionCreators } from 'redux';
import { myMeetings } from '../../../../redux/refresh/refreshFields';
import { registerRefresh, unregisterRefresh } from '../../../../redux/refresh/actionCreators';
import MyMeetings from './MyMeetings';
import { getMeetings } from '../../../../clientManager/meetingsClientManager';

const propTypes = {
    // user: ImmutablePropTypes.map.isRequired //redux
    meetings: ImmutablePropTypes.List,
    isBusy: PropTypes.bool.isRequired,
}

function MyMeetingsContainer({ meetings, isBusy }) {
    return <MyMeetings isBusy={isBusy}
        meetings={meetings} />
}

MyMeetingsContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user,
    timestamp: state.refresh[myMeetings]
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerRefresh,
        unregisterRefresh
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMeetingsContainer);