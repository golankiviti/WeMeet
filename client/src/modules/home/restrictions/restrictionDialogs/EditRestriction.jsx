import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RestrictionDialog from './RestrictionDialog';
import { editRestriction } from '../../../../clientManager/userManager';
import { updateRefresh } from '../../../../redux/refresh/actionCreators';
import { home as homeKey } from '../../../../redux/refresh/refreshFields';
import { bindActionCreators } from 'redux';

const propTypes = {
    onClose: PropTypes.func.isRequired,
    userId: PropTypes.string, // from redux
    restriction: PropTypes.object,
    updateRefresh: PropTypes.func
};

function EditRestriction({ onClose, restriction, userId, updateRefresh }) {
    const handleSubmit = values => {
        editRestriction(userId, values)
            .then(() => {
                onClose();
                updateRefresh(homeKey)
            })
    }
    return <RestrictionDialog title='עריכת אילוץ'
        form='edit-restriction'
        restriction={restriction}
        onSubmit={handleSubmit}
        onClose={onClose} />
}

EditRestriction.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateRefresh
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRestriction);