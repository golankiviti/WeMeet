import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';
import LocationList from './LocationList';
import { userLocations } from '../../../clientManager/userManager';

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
        userLocations(this.props.userId)
            .then(res => {
                this.setState({
                    locations: fromJS(res)
                });
            })
        // this.setState({
        //     locations: fromJS([
        //         {
        //             _id: '1',
        //             name: 'גולן גולן גולן'
        //         },
        //         {
        //             _id: '2',
        //             name: 'גולן גולן גולן'
        //         }
        //     ])
        // })
    }

    render() {
        return <LocationList locations={this.state.locations}
            {...this.props} />
    }
}

LocationListContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : ''
});

export default connect(mapStateToProps)(LocationListContainer);