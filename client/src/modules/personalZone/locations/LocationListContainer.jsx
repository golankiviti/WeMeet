import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'redux-persist-transform-immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LocationList from './LocationList';
import { deleteLocation } from '../../../clientManager/userManager';
import { updateRefresh } from '../../../redux/refresh/actionCreators';
import { locations as locationsKey } from '../../../redux/refresh/refreshFields';

const propTypes = {
    userId: PropTypes.string, // from redux
    locations: ImmutablePropTypes.List,
    isBusy: PropTypes.bool.isRequired,
    updateRefresh: PropTypes.func
};

function LocationListContainer({ userId, locations, isBusy, updateRefresh }) {
    const refresh = () => {
        updateRefresh(locationsKey)
    }

    const handleDelete = id => {
        deleteLocation(id)
            .then(refresh)
    }

    return <LocationList locations={locations}
        userId={userId}
        isBusy={isBusy}
        refresh={refresh}
        onDelete={handleDelete} />
}

LocationListContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateRefresh,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationListContainer);