import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '../../../common/TextField';
import classNames from 'classnames';
import styles from './loginPanel.module.scss';
import DateTimePicker from '../../../common/DateTimePicker';
import CheckboxList from '../../../common/CheckboxList';

const propTypes = {
    locations: ImmutablePropTypes.List.isRequired,
    users: ImmutablePropTypes.List.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class NewMeeting extends Component {
    render() {
        const { handleSubmit, valid, locations, users } = this.props;

        const submitButtonClasses = classNames(styles.button, {
            [styles.disabled]: !valid
        });

        return <form onSubmit={handleSubmit}
            className={styles.form}>
            <Card raised>
                <div className={styles.header}>פגישה חדשה</div>
                <CardContent className={styles.cardContent}>
                    <Field name='name'
                        component={TextField}
                        type='text'
                        label='שם' />
                    <Field name='fromDate'
                        component={DateTimePicker}
                        label='מתאריך' />
                    <Field name='toDate'
                        component={DateTimePicker}
                        label='עד תאריך' />
                    <Field name='participants'
                        component={CheckboxList}
                        items={users}
                        label='משתתפים' />
                    <Field name='locations'
                        component={CheckboxList}
                        items={locations}
                        label='מיקומים' />
                </CardContent>
                <CardActions className={styles.cardActions}>
                    <Button className={submitButtonClasses}
                        disabled={!valid}
                        type='submit'>
                        שלח
                    </Button>
                </CardActions>
            </Card>
        </form>
    }
}

NewMeeting.PropTypes = propTypes;

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.username = 'חובה להזין שם לפגישה'
    }

    if (!values.fromDate) {
        errors.fromDate = 'חובה להזין תאריך מינימום לפגישה'
    }

    if (!values.toDate) {
        errors.toDate = 'חובה להזין תאריך מקסימום לפגישה'
    }

    if (!values.participants) {
        errors.participants = 'חובה להזמין משתתפים לפגישה'
    }

    if (!values.locations) {
        errors.locations = 'חובה להזין מיקומים אפשריים לפגישה'
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
    form: 'newMeeting',
    validate,
    asyncValidate
})(NewMeeting);