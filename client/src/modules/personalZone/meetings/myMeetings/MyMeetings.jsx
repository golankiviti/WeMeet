import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ImmutablePropTypes from 'immutable-prop-types';
import Meeting from './Meeting';
import styles from './myMeetings.module.scss';

const propTypes = {
    // meetings: ImmutablePropTypes.List.isRequired,
}

export default class MyMeetings extends Component {
    render() {
        const { meetings } = this.props;
        return (
            <Card raised className={styles.container}>
                <div className={styles.header}>הפגישות שלי</div>
                <CardContent className={styles.cardContent}>
                    {meetings.map(meeting => <Meeting meeting={meeting} />)}
                </CardContent>
            </Card>
        );
    }
}

MyMeetings.propTypes = propTypes;