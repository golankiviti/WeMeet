import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeclineMeetingDialog from './DeclineMeetingDialog';
import styles from './meetingForApproval.module.scss';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onApprove: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
}

function MeetingForApproval({ id, name, date, onApprove, onDecline }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleApprove = useCallback(() => {
        onApprove(id);
    }, [id, onApprove]);

    const openDialog = () => setDialogOpen(true)

    const closeDialog = () => setDialogOpen(false)

    const handleDecline = useCallback(() => {
        onDecline(id);
        setDialogOpen(false);
    }, [id, onDecline]);

    return <>
        <div className={styles.container}>
            <div>{`${name} - ${date}`}</div>
            <div className={styles.buttons}>
                <IconButton>
                    <Icon fontSize='small'>remove_red_eye</Icon>
                </IconButton>
                <IconButton onClick={handleApprove}>
                    <Icon fontSize='small'>done</Icon>
                </IconButton>
                <IconButton onClick={openDialog}>
                    <Icon fontSize='small'>clear</Icon>
                </IconButton>
            </div>
        </div>
        {
            dialogOpen && <DeclineMeetingDialog onApprove={handleDecline} onDecline={closeDialog} />
        }
    </>
}

MeetingForApproval.propTypes = propTypes;

export default MeetingForApproval;