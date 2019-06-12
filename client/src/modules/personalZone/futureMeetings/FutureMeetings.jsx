import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card'
import FutureMeeting from './FutureMeeting';
import styles from './futureMeetings.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import moment from 'moment';

const propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    isBusy: PropTypes.bool.isRequired
};

function FutureMeetings({ meetings, isBusy }) {
    const contentClasses = classNames(styles.content, {
        [styles.busy]: isBusy
    })
    return <Card raised
        className={styles.container}>
        <div className={styles.header}>פגישות שמחכות לשיבוץ</div>
        <div className={contentClasses}>
            {
                isBusy &&
                <CircularProgress /> ||
                meetings.size === 0 &&
                <div>לא קיימות פגישות שממתינות לשיבוץ.</div> ||
                meetings.map(x => <FutureMeeting key={x.get('_id')}
                    id={x.get('_id')}
                    name={x.get('name')}
                    date={`${moment(x.get('fromDate')).format('DD/MM/YYYY hh:mm:ss')} - ${moment(x.get('toDate')).format('DD/MM/YYYY hh:mm:ss')}`} />
                )
            }
        </div>
    </Card>
}

FutureMeetings.propTypes = propTypes;

export default FutureMeetings;