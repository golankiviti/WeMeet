import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationDialog from './LocationDialog';
import { addLocation } from '../../../../clientManager/userManager';

const propTypes = {
    onClose: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

class AddLocation extends Component {
    handleSubmit = values => {
        addLocation(this.props.userId, values)
            .then(() => this.props.onClose())
    }


    render() {
        const { onClose } = this.props;

        return <LocationDialog title='מיקום חדש'
            form='add-location'
            onSubmit={this.handleSubmit}
            onClose={onClose} />
    }
}

AddLocation.propTypes = propTypes;

export default AddLocation;