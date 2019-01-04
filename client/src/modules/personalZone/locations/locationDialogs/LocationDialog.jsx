import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import TextField from '../../../../common/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import styles from './locationDialog.module.scss';

const propTypes = {
    title: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    valid: PropTypes.bool, // from redux-form
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

class LocationDialog extends Component {
    render() {
        const { title, valid, handleSubmit, onClose } = this.props;
        return <Dialog onClose={onClose}
            open={true}>
            <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
            <DialogContent>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Field name='name'
                        component={TextField}
                        type='text'
                        label='שם' />
                    <Field name='address'
                        component={TextField}
                        type='text'
                        label='כתובת' />
                </form>
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
        </Dialog>
    }
}

LocationDialog.propTypes = propTypes;

const validate = values => {
    let errors = {};

    if (!values.name) {
        errors.name = 'חובה להזין שם';
    }

    if (!values.address) {
        errors.address = 'חובה להזין כתובת'
    }

    return errors;
};

export default reduxForm({
    validate
})(LocationDialog);