import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './futureMeeting.module.scss';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}

function FutureMeeting({ id, name, date }) {
    return <div className={styles.container}>
        <div>{`${name} - ${date}`}</div>
    </div>
}

FutureMeeting.propTypes = propTypes;

export default FutureMeeting;