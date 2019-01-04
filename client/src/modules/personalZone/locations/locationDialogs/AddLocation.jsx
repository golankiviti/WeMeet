import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationDialog from './LocationDialog';

const propTypes = {
    onClose: PropTypes.func.isRequired
};

class AddLocation extends Component {
    handleSubmit = values => {
        console.log(values);
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