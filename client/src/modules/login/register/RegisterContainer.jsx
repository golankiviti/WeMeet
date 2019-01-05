import React, { Component } from 'react';
import Register from './Register';
import { fromJS } from 'immutable';
import { createUser as register } from '../../../clientManager/loginManager';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../redux/user/actionCreators';
import styles from './registerContainer.module.scss';

class RegisterContainer extends Component {
    handleSubmit = values => {
        register(values)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    this.props.updateUser(fromJS(res));
                    this.props.history.push('/home');
                }
            })
    }

    render() {
        return <div className={styles.container}>
            <Register onSubmit={this.handleSubmit} {...this.props} />
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(RegisterContainer);