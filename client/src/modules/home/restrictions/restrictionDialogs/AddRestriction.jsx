import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RestrictionDialog from './RestrictionDialog';
import { addRestriction } from '../../../../clientManager/userManager';

const propTypes = {
    onClose: PropTypes.func.isRequired,
    userId: PropTypes.string // from redux
};

class AddRestriction extends Component {
    handleSubmit = values => {
        addRestriction(this.props.userId, values)
            .then(() => this.props.onClose())
    }


    render() {
        const { onClose } = this.props;

        return <RestrictionDialog title='אילוץ חדש'
            form='add-restriction'
            onSubmit={this.handleSubmit}
            onClose={onClose} />
    }
}

AddRestriction.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

export default connect(mapStateToProps)(AddRestriction);