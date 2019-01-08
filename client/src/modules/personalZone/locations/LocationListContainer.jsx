import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';
import LocationList from './LocationList';
import { userLocations, deleteLocation } from '../../../clientManager/userManager';

const propTypes = {
    userId: PropTypes.string // from redux
};

class LocationListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: List()
        };
    }

    componentDidMount() {
        this.fetchLocations();
    }

    fetchLocations = () => {
        userLocations(this.props.userId)
            .then(res => {
                this.setState({
                    locations: fromJS(res)
                });
            })
    }

    handleDelete = id => {
        deleteLocation(id)
            .then(this.fetchLocations)
    }

    render() {
        return <LocationList locations={this.state.locations}
            {...this.props}
            refresh={this.fetchLocations}
            onDelete={this.handleDelete} />
    }
}

LocationListContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

export default connect(mapStateToProps)(LocationListContainer);