import React, { Component } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NewMeetingContainer from '../newMeeting/NewMeetingContainer';
import ImmutablePropTypes from 'immutable-prop-types';
import styles from './myMeetings.module.scss';

const propTypes = {
    meeting: ImmutablePropTypes.map.isRequired
}

export default class Meeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewMeetingDialog: false
        }
        this.handleNewMeetingClick = this.handleNewMeetingClick.bind(this);
        this.closeNewMeetingDialog = this.closeNewMeetingDialog.bind(this);
    }

    handleNewMeetingClick() {
        this.setState({ showNewMeetingDialog: true })
    }

    closeNewMeetingDialog() {
        this.setState({ showNewMeetingDialog: false })
    }

    render() {
        const { meeting } = this.props;
        return (
            <div>
                <span>{meeting.get('name')} -
                {meeting.get('actualDate') ?
                        new Date(meeting.get('actualDate')).toLocaleDateString() :
                        'עדיין לא נקבע תאריך'
                    }
                </span>
                <VisibilityIcon className={styles.editIcon} onClick={this.handleNewMeetingClick} />
                {
                    this.state.showNewMeetingDialog &&
                    <NewMeetingContainer onClose={this.closeNewMeetingDialog} meeting={meeting} title={meeting.get('name')} />
                }
            </div>

        );
    }
}

Meeting.propTypes = propTypes;