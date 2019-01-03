import React, { Component } from 'react';
import styles from './shell.module.scss';
import AppBarContainer from './appBar/AppBarContainer';

class Shell extends Component {
    render() {
        return <div className={styles.container}>
            <AppBarContainer>Shell</AppBarContainer>
            <div className={styles.content}>
                {this.props.children}
            </div>
        </div>
    }
}

export default Shell;