import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const propTypes = {
    onApprove: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
};

function DeclineMeetingDialog({ onApprove, onDecline }) {
    return <Dialog open={true}>
    <DialogTitle>{'אזהרה'}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        דחיית הפגישה לא תגרור את ביטולה, הפגישה תתקיים בלעדייך.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onApprove} color="primary">
        אישור
      </Button>
      <Button onClick={onDecline} color="primary" autoFocus>
        ביטול
      </Button>
    </DialogActions>
  </Dialog>
}


DeclineMeetingDialog.propTypes = propTypes;
export default DeclineMeetingDialog;