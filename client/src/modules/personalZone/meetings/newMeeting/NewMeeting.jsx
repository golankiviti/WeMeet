import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'immutable-prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '../../../../common/TextField';
import styles from './newMeeting.module.scss';
import DateTimePicker from '../../../../common/DateTimePicker';
import AutoComplete from '../../../../common/AutoComplete';

const propTypes = {
    // locations: ImmutablePropTypes.List.isRequired,
    // users: ImmutablePropTypes.List.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    meeting: ImmutablePropTypes.map,
    valid: PropTypes.bool // from redux-form
}

class NewMeeting extends Component {
    componentDidUpdate() {
        const { meeting, users } = this.props;
        if (meeting && users.size > 0) {
            this.props.initialize({
                name: meeting.get('name'),
                fromDate: meeting.get('fromDate').substring(0, 16),
                toDate: meeting.get('toDate').substring(0, 16),
                invited:
                    meeting.get('invited').map(userId => {
                        return users.find(user => user.get('value') === userId)
                    }).toJS(),
                location: { label: meeting.get('location'), value: meeting.get('location') }
            });
        }
    }

    render() {
        const { handleSubmit, valid, locations, users, onClose, onSubmit, title } = this.props;

        return <Dialog onClose={onClose}
            open={true}>
            <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <form className={styles.form}>
                    <div className={styles.field}>
                        <Field name='name'
                            component={TextField}
                            type='text'
                            label='שם' />
                    </div>
                    <div className={styles.field}>
                        <Field name='fromDate'
                            component={DateTimePicker}
                            label='מתאריך' />
                    </div>
                    <div className={styles.field}>
                        <Field name='toDate'
                            component={DateTimePicker}
                            label='עד תאריך' />
                    </div>
                    <div className={styles.field}>
                        <Field name='invited'
                            component={AutoComplete}
                            options={users.toJS()}
                            placeholder='מוזמנים'
                            label='מוזמנים'
                            multi
                        />
                    </div>
                    <Field name='location'
                        component={AutoComplete}
                        options={locations.toJS()}
                        placeholder='מיקום'
                        label='מיקום'
                        allowCreate
                    />
                </form>
            </DialogContent>
            <DialogActions className={styles.dialogActions}>
                <Button color='primary'
                    disabled={!valid}
                    type='submit'
                    onClick={handleSubmit(onSubmit)}>
                    אישור
            </Button>
                <Button onClick={onClose}>
                    ביטול
            </Button>
            </DialogActions>
        </Dialog>
    }
}

NewMeeting.propTypes = propTypes;
NewMeeting.defaultProps = {
    title: 'פגישה חדשה'
}

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'חובה להזין שם לפגישה'
    }

    if (!values.fromDate) {
        errors.fromDate = 'חובה להזין תאריך מינימום לפגישה'
    }

    if (!values.toDate) {
        errors.toDate = 'חובה להזין תאריך מקסימום לפגישה'
    }

    if (!values.invited || (values.invited && values.invited.length === 0)) {
        errors.invited = 'חובה להזמין משתתפים לפגישה'
    }

    if (!values.location || (values.location && values.location.length === 0)) {
        errors.location = 'חובה להזין מיקום לפגישה'
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