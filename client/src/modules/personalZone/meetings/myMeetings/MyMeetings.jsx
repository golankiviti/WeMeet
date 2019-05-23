import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Meeting from './Meeting';
import styles from './myMeetings.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const propTypes = {
    isBusy: PropTypes.bool.isRequired,
    // meetings: ImmutablePropTypes.List.isRequired,
}

export default class MyMeetings extends Component {
    render() {
        const { meetings } = this.props;

        const contentClasses = classNames(styles.cardContent, {
            [styles.busy]: this.props.isBusy
        })
        return (
            <Card raised className={styles.container}>
                <div className={styles.header}>הפגישות שלי</div>
                <CardContent className={contentClasses}>
                    {
                        this.props.isBusy &&
                        <CircularProgress /> ||
                        meetings.size === 0 &&
                        <div>לא קיימות פגישות ששובצו וממתינות לאישור.</div> ||
                        meetings.map(meeting => <Meeting meeting={meeting} />)
                    }
                </CardContent>
            </Card>
        );
    }
}

MyMeetings.propTypes = propTypes;