import React, { Component } from 'react';
import styles from './waitingMeetingsList.module.scss';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';

export default class Meeting extends Component {
    render() {
        const { meeting, onConfirm, onReject } = this.props;

        return (
            <div className={styles.meetingItem}>
                <span className={styles.meetingTitle}>{meeting.title} - {meeting.startTime}</span>
                <Fab size='small' className={styles.confirmButton} onClick={() => onConfirm(meeting._id)}>
                    <DoneIcon />
                </Fab>
                <Fab size='small' onClick={() => onReject(meeting._id)}>
                    <CloseIcon />
                </Fab>
            </div>
        );
    }
}