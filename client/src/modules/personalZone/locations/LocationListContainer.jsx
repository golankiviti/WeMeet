import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import LocationList from './LocationList';

class LocationListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: List()
        };
    }

    componentDidMount() {
        this.setState({
            locations: fromJS([
                {
                    _id: '1',
                    name: 'גולן גולן גולן'
                },
                {
                    _id: '2',
                    name: 'גולן גולן גולן'
                }
            ])
        })
    }

    render() {
        return <LocationList locations={this.state.locations} />
    }
}

export default LocationListContainer;