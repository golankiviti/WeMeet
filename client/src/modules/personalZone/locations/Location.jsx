import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import styles from './location.module.scss';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

class Location extends Component {
    render() {
        const { name } = this.props;
        return <div className={styles.container}>
            <div>{name}</div>
            <div className={styles.buttons}>
                <IconButton>
                    <Icon fontSize='small'>create</Icon>
                </IconButton>
                <IconButton>
                    <Icon fontSize='small'>remove_red_eye</Icon>
                </IconButton>
                <IconButton>
                    <Icon fontSize='small'>remove</Icon>
                </IconButton>
            </div>
        </div>
    }
}

Location.propTypes = propTypes;

export default Location;