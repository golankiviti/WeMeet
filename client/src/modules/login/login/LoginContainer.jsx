import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../redux/user/actionCreators';
import LoginPanel from './LoginPanel';
import { login } from '../../../clientManager/loginManager';
import styles from './loginContainer.module.scss';
import { SubmissionError } from 'redux-form'

class LoginContainer extends Component {
    handleSubmit = values => {
        return login(values)
            .then(res => {
                if (res) {
                    this.props.updateUser(fromJS(res));
                    this.props.history.push('/home');
                } else {
                    throw new SubmissionError({
                        _error: 'פרטי התחברות שגויים, אנא נסה שוב'
                    })
                }

            })
    }

    render() {
        const { updateUser, ...otherProps } = this.props;

        return <div className={styles.container}>
            <LoginPanel onSubmit={this.handleSubmit}
                {...otherProps} />
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginContainer);