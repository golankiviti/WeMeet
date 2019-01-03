import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../redux/user/actionCreators';
import LoginPanel from './LoginPanel';
import { login } from '../../../clientManager/loginManager';
import styles from './loginContainer.module.scss';

class LoginContainer extends Component {
    handleSubmit = values => {
        login(values)
            .then(res => res.json())
            .then(res => {
                this.props.updateUser(fromJS(res));
                this.props.history.push('/home');
            })
    }

    render() {
        const { updateUser, ...otherProps } = this.props;

        return <div className={styles.container}>
            <LoginPanel onSubmit={this.handleSubmit}
                {...otherProps}/>
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginContainer);