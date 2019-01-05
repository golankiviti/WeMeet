import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loggedIn } = rest;
    return (
        <Route
        {...rest}
        render={props =>
            loggedIn ? (
            <Component {...props} />
            ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        }
        />
  )
}

const mapStateToProps = state => ({
    loggedIn: state.user ? true : false
});

export default connect(mapStateToProps)(PrivateRoute);