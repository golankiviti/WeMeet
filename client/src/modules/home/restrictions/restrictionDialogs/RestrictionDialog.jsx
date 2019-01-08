import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import TextField from '../../../../common/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DateTimePicker from '../../../../common/DateTimePicker';
import styles from './restrictionDialog.module.scss';

const propTypes = {
    title: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    valid: PropTypes.bool, // from redux-form
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

class RestrictionDialog extends Component {
    render() {
        const { title, valid, handleSubmit, onClose } = this.props;
        return <Dialog onClose={onClose}
            open={true}>
            <form onSubmit={handleSubmit}>
                <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <Field name='name'
                        component={TextField}
                        type='text'
                        label='שם' />
                    <Field name='startDate'
                        component={DateTimePicker}
                        label='תאריך התחלה' />
                    <Field name='endDate'
                        component={DateTimePicker}
                        label='תאריך סיום' />
                </DialogContent>
                <DialogActions className={styles.dialogActions}>
                    <Button color='primary'
                        disabled={!valid}
                        type='submit'>
                        אישור
                    </Button>
                    <Button onClick={onClose}>
                        ביטול
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    }
}

RestrictionDialog.propTypes = propTypes;


const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'חובה להזין שם';
    }

    if (!values.startDate) {
        errors.startDate = 'חובה להזין תאריך התחלה';
    }

    if (!values.endDate) {
        errors.endDate = 'חובה להזין תאריך סיום';
    }

    return errors;
}

export default reduxForm({
    validate
})(RestrictionDialog);