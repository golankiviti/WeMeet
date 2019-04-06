import React, { useCallBack } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import styles from './meetingForApproval.module.scss';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onApprove: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
}

function MeetingForApproval({id, name, date, onApprove, onDecline}) {
    const handleApprove = useCallBack(() => {
        onApprove(id);
    }, [id, onApprove]);
    const handleDecline = useCallBack(() => {
        onDecline(id)
    }, [id, onDecline]);

    return <div className={styles.container}>
        <div>{`${name} - ${date}`}</div>
        <div className={styles.buttons}>
                <IconButton onClick={handleApprove}>
                    <Icon fontSize='small'>done</Icon>
                </IconButton>
                <IconButton onClick={handleDecline}>
                    <Icon fontSize='small'>clear</Icon>
                </IconButton>
            </div>
    </div>
}

MeetingForApproval.propTypes = propTypes;

export default MeetingForApproval;