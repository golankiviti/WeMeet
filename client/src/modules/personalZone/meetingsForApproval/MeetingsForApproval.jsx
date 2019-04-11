import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card'
import MeetingForApproval from './MeetingForApproval';
import styles from './meetingsForApproval.module.scss';

const propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    onApprove: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
};

function MeetingsForApproval({meetings, onApprove, onDecline}) {
    return <Card raised
        className={styles.container}>
        <div className={styles.header}>פגישות ממתינות לאישור</div>
        <div className={styles.content}>
        {
            meetings.map(x => <MeetingForApproval key={x.get('_id')}
                id={x.get('_id')}
                name={x.get('name')}
                date='ssss'
                onApprove={onApprove}
                onDecline={onDecline} />
            )
        }
        </div>
    </Card>
}

MeetingsForApproval.propTypes = propTypes;

export default MeetingsForApproval;