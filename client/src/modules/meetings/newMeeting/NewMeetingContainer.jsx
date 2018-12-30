import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import NewMeeting from './NewMeeting';

export default class NewMeetingContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: List(),
            users: List()
        };
        this.getLocations = this.getLocations.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        this.getLocations();
        this.getUsers();
    }

    getLocations() {
        // TODO: locationClientManager.getLocations -> state.locations
        this.setState({
            locations: fromJS([
                { id: 1, name: 'הבית של עידן' },
                { id: 2, name: 'המכללה למנהל' },
                { id: 3, name: 'שלישות רמת גן' }
            ])
        })
    }

    handleSubmit = values => {
        console.log(values)
        //TODO: meetingsClientManager.createMeeting
    }

    getUsers() {
        // TODO: usersClientManager.getLocations -> state.locations
        this.setState({
            users: fromJS([
                { id: 1, name: 'עידן' },
                { id: 2, name: 'איגור' },
                { id: 3, name: 'גיייייל' }
            ])
        })
    }

    render() {
        const { users, locations } = this.state;
        return <NewMeeting locations={locations} users={users} onSubmit={this.handleSubmit} />
    }
}