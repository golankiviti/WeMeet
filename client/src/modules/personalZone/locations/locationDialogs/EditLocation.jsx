import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationDialog from './LocationDialog';
import { editLocation, getLocation } from '../../../../clientManager/userManager';;

const propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

class EditLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialValues: undefined
        };
    }

    handleSubmit = values => {
        editLocation(this.props.userId, this.props.id, values)
            .then(() => this.props.onClose())
    }

    componentDidMount() {
        getLocation(this.props.userId, this.props.id)
            .then(res => {
                this.setState({
                    initialValues: {
                        name: res.name,
                        address: res.address
                    }
                })
            });
    }

    render() {
        const { onClose } = this.props;
        return this.state.initialValues ?
            <LocationDialog form='edit-location'
                title='עריכת מיקום'
                onClose={onClose}
                onSubmit={this.handleSubmit}
                initialValues={this.state.initialValues} /> :
            null

    }
}

EditLocation.propTypes = propTypes;

export default EditLocation;