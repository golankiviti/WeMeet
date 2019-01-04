import React, { Component } from 'react';
import { fromJS, List } from 'immutable';
import { fetchWaitingMeetings } from '../../clientManager/MeetingsManager';
import remove from 'lodash/remove';
import WaitingMeetingsList from './waitingMeetingsList';

class WaitingMeetingsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetings: List()
        };

        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.getMeetings = this.getMeetings.bind(this);
    }

    handleConfirm = (meetingId) => {
        let meetings = this.state.meetings.toJS();
        // TODO: update the store about confirm
        remove(meetings, (item) => {
            return item._id === meetingId;
        });
        this.setState({
            meetings: fromJS(meetings)
        });
    }

    handleReject = (meetingId) => {
        let meetings = this.state.meetings.toJS();
        remove(meetings, (item) => {
            return item._id === meetingId;
        });
        this.setState({
            meetings: fromJS(meetings)
        });
    }

    componentDidMount() {
        this.getMeetings();
    }

    getMeetings = () => {
        fetchWaitingMeetings()
            .then(meetings => {
                this.setState({
                    meetings: fromJS(meetings)
                });
            });
    }

    render() {
        let { meetings } = this.state;
        meetings = meetings.toJS();

        return <WaitingMeetingsList meetings={meetings} handleConfirm={this.handleConfirm} handleReject={this.handleReject} />
    }
}

export default WaitingMeetingsContainer;