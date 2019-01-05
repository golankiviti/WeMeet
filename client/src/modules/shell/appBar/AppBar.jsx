import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { default as MaterialAppBar } from '@material-ui/core/AppBar';
import styles from './appbar.module.scss';

const propTypes = {
    onLogout: PropTypes.func.isRequired,
    onHome: PropTypes.func.isRequired,
    onPersonalZone: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
}

class AppBar extends Component {
    render() {
        const { loggedIn, onHome, onPersonalZone, onLogout } = this.props;

        const logoutClasses = classNames(styles.button, styles.logout);

        return <MaterialAppBar className={styles.appbar}>
            {
                loggedIn ?
                <>
                    <div className={styles.button}
                        onClick={onHome}>
                        WeMeet
                    </div>
                    <div className={styles.button}
                        onClick={onPersonalZone}>
                        אזור אישי
                    </div>
                    <div className={styles.button}>פגישה חדשה</div>
                    <div className={logoutClasses}
                        onClick={onLogout}>
                        התנתק
                    </div>
                </> :
                <div>WeMeet</div>
            }
        </MaterialAppBar>
    }
}

AppBar.propTypes = propTypes;

export default AppBar;