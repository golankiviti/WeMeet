import React, { Component } from 'react';
import Register from './Register';
import styles from './registerContainer.module.scss';
import { createUser } from '../../../clientManager/loginManager';

class RegisterContainer extends Component {
    handleSubmit = values => {
        createUser(values)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.props.history.push('/');
                }
            })
    }

    render() {
        return <div className={styles.container}>
        <div className={styles.logo}>WeMeet</div>
        <Register onSubmit={this.handleSubmit} {...this.props} />
    </div>
    }
}

export default RegisterContainer;