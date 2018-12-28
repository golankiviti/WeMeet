import React, { Component } from 'react';
import Register from './Register';
import styles from './registerContainer.module.scss';

class RegisterContainer extends Component {
    handleSubmit = values => {

    }

    render() {
        return <div className={styles.container}>
        <div className={styles.logo}>WeMeet</div>
        <Register onSubmit={this.handleSubmit} />
    </div>
    }
}

export default RegisterContainer;