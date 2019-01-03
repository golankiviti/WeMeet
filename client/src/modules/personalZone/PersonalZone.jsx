import React, { Component } from 'react';
import LocationListContainer from './locations/LocationListContainer';
import styles from './personalZone.module.scss';

class PersonalZone extends Component {
    render() {
        return <div className={styles.container}>
            <LocationListContainer />
        </div>
    }
}

export default PersonalZone; 