import React, { Component } from 'react';
import Register from './Register';
import styles from './registerContainer.module.scss';
import { createUser as register } from '../../../clientManager/loginManager';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../../../redux/user/actionCreators';

class RegisterContainer extends Component {
    handleSubmit = values => {
        register(values)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.props.createUser(res);
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ createUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(RegisterContainer);