import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../redux/user/actionCreators';
import styles from './loginContainer.module.scss';
import LoginPanel from './LoginPanel';

class LoginContainer extends Component {
    handleSubmit = values => {
        console.log(values)
        //fetching user details
        const user = Map({ username: 'golan' })
        this.props.updateUser(user)
    }

    render() {
        const { updateUser, ...otherProps } = this.props;

        return <div className={styles.container}>
            <div className={styles.logo}>WeMeet</div>
            <LoginPanel onSubmit={this.handleSubmit}
                {...otherProps}/>
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginContainer);