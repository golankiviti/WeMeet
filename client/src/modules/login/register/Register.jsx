import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField, RadioButton } from '../../../common/index';
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames';
import styles from './register.module.scss';
import { validate, asyncValidate } from './validation';

const propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func // from redux-form
}

class Register extends Component {
    render() {
        const { handleSubmit, valid } = this.props;

        const submitButtonClasses = classNames(styles.button, {
            [styles.disabled]: !valid
        });

        return <form onSubmit={handleSubmit}
            className={styles.form}>
            <Card raised>
                <div className={styles.header}>הרשמה</div>
                <CardContent className={styles.cardContent}>
                    <Field name='email'
                    component={TextField}
                    type='text'
                    label='אימייל'/>
                    <Field name='password'
                        component={TextField}
                        type='password'
                        label='סיסמא' />
                    <Field name='address'
                        component={TextField}
                        type='text'
                        label='כתובת' />
                    <Field name='sex'
                        component={RadioButton}>
                        <FormControlLabel control={<Radio />} value='male' label='זכר' />
                        <FormControlLabel control={<Radio />} value='female' label='נקבה' />
                    </Field>
                </CardContent>
                <CardActions className={styles.cardActions}>
                    <Button className={submitButtonClasses}
                        disabled={!valid}>
                        הירשם
                    </Button>
                    <Button className={styles.button}>
                        ביטול
                    </Button>
                </CardActions>
            </Card>
        </form>
    }
}

Register.propTypes = propTypes;

export default reduxForm({
    form: 'register',
    validate,
    asyncValidate,
    initialValues: {
        sex: 'female'
    }
})(Register);
