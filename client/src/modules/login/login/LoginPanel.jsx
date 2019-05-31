import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '../../../common/TextField';
import classNames from 'classnames';
import styles from './loginPanel.module.scss';

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func // from redux-form
}

class LoginPanel extends Component {
    constructor(props) {
        super(props);
    }

    handleRegister = () => {
        this.props.history.push('/register');
    }

    render() {
        const { handleSubmit, valid, error } = this.props;

        const submitButtonClasses = classNames(styles.button, {
            [styles.disabled]: !valid
        });

        return <form onSubmit={handleSubmit}
            className={styles.form}>
            <Card raised>
                <div className={styles.header}>התחברות</div>
                <CardContent className={styles.cardContent}>
                    <Field name='email'
                        component={TextField}
                        type='text'
                        label='מייל' />
                    <Field name='password'
                        component={TextField}
                        type='password'
                        label='סיסמא' />
                    {
                        error && <div className={styles.error}>{error}</div>
                    }
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

LoginPanel.propTypes = propTypes;

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'חובה להזין כתובת מייל'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'כתובת מייל לא חוקית'
    }

    if (!values.password) {
        errors.password = 'חובה להזין סיסמא'
    }

    return errors
}


export default reduxForm({
    form: 'login',
    validate
})(LoginPanel);