import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeUser } from '../../../redux/user/actionCreators';
import AppBar from './AppBar';
import { withRouter } from 'react-router-dom';

const propTypes = {
    removeUser: PropTypes.func, // from redux
    loggedIn: PropTypes.bool, // from redux
};

class AppBarContainer extends Component {
    handleLogout = () => {
        this.props.removeUser();
        this.props.history.push('/')
    }

    handleHome = () => { this.props.history.push('/home'); }

    handlePersonalZone = () => { this.props.history.push('/personalZone'); }

    render() {
        const { removeUser, history, ...otherProps } = this.props;
        return <AppBar onLogout={this.handleLogout}
            onHome={this.handleHome}
            onPersonalZone={this.handlePersonalZone}
            {...otherProps} />
    }
}

AppBarContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    loggedIn: state.user ? true : false
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ removeUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppBarContainer))