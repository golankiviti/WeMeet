import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card'
import MeetingForApproval from './MeetingForApproval';
import styles from './meetingsForApproval.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    isBusy: PropTypes.bool.isRequired,
    onApprove: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
};

function MeetingsForApproval({ meetings, onApprove, onDecline, isBusy }) {
    const contentClasses = classNames(styles.content, {
        [styles.busy]: isBusy
    })
    return <Card raised
        className={styles.container}>
        <div className={styles.header}>פגישות ששובצו וממתינות לאישור</div>
        <div className={contentClasses}>
            {
                isBusy &&
                <CircularProgress /> ||
                meetings.size === 0 &&
                <div>לא קיימות פגישות ששובצו וממתינות לאישור.</div> ||
                meetings.map(x => <MeetingForApproval key={x.get('_id')}
                    id={x.get('_id')}
                    name={x.get('name')}
                    date={new Date(x.get('actualDate')).toLocaleDateString()}
                    onApprove={onApprove}
                    onDecline={onDecline} />
                )
            }
        </div>
    </Card>
}

MeetingsForApproval.propTypes = propTypes;

export default MeetingsForApproval;