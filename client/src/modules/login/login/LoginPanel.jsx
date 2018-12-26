import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '../../../common/TextField';
import classNames from 'classnames';
import styles from './loginPanel.module.scss';

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired // from redux-form
}

class LoginPanel extends Component {
    constructor(props) {
        super(props);
    }

    handleRegister = () => {
        this.props.history.push('/register');
    }

    render() {
        const { handleSubmit, valid } = this.props;

        const submitButtonClasses = classNames(styles.button, {
            [styles.disabled]: !valid
        });

        return <form onSubmit={handleSubmit}
            className={styles.form}>
            <Card raised>
                <div className={styles.header}>התחברות</div>
                <CardContent className={styles.cardContent}>
                    <Field name='username'
                        component={TextField}
                        type='text'
                        label='שם משתמש' />
                    <Field name='password'
                        component={TextField}
                        type='password'
                        label='סיסמא' />
                </CardContent>
                <CardActions className={styles.cardActions}>
                    <Button className={submitButtonClasses}
                        disabled={!valid}
                        type='submit'>
                        התחבר
                    </Button>
                    <Button className={styles.button}
                        onClick={this.handleRegister}>
                        הירשם
                    </Button>
                </CardActions>
            </Card>
        </form>

    }
}

const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'חובה להזין שם משתמש'
    }

    if (!values.password) {
      errors.password = 'חובה להזין סיסמא'
    }

    return errors
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    //throw {username: 'That username is taken'}
  })
}

export default reduxForm({
    form: 'login',
    validate,
    asyncValidate   
})(LoginPanel);