import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'immutable-prop-types';
//import { getLocations } from '../../../../clientManager/locationsClientManager';
//import { getUsers } from '../../../../clientManager/usersClientManager';
import { upsertMeeting } from '../../../../clientManager/meetingsClientManager';
import PropTypes from 'prop-types';
import NewMeeting from './NewMeeting';

const propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    meeting: ImmutablePropTypes.map
}

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
        // getLocations().then(res => {
        //     this.setState({ locations: fromJS(res) });
        // })
        // .done();
        this.setState({
            locations: fromJS([
                { id: 1, name: 'הבית של עידן' },
                { id: 2, name: 'המכללה למנהל' },
                { id: 3, name: 'שלישות רמת גן' }
            ])
        })
    }

    handleSubmit = values => {
        debugger;
        console.log(values)
        //upsertMeeting(values);
    }

    getUsers() {
        // getUsers().then(res => {
        //     this.setState({ users: fromJS(res) });
        // })
        // .done();
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
        return <NewMeeting locations={locations} users={users} onSubmit={this.handleSubmit} {...this.props} />
    }
}

NewMeetingContainer.propTypes = propTypes;
