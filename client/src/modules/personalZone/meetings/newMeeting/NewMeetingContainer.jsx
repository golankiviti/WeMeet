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
        this.handleSubmit = this.handleSubmit.bind(this);
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

        const locations = values.locations.map(x => this.state.locations.find(y => y.name === x.name).get('id'));
        const participants = values.participants.map(x => this.state.users.find(y => y.name === x.name).get('email'));
        const meeting = Object.assign({}, values, { locations, participants });
        upsertMeeting(meeting).then((res) => {
            console.log('a');
        });
        this.props.onClose();
    }

    getUsers() {
        // getUsers().then(res => {
        //     this.setState({ users: fromJS(res) });
        // })
        // .done();
        this.setState({
            users: fromJS([
                { email: 'aaa@aaa.com', name: 'עידן' },
                { email: 'bbb@bbb.com', name: 'איגור' },
                { email: 'ccc@ccc.com', name: 'גיייייל' }
            ])
        })
    }

    render() {
        const { users, locations } = this.state;
        return <NewMeeting locations={locations} users={users} onSubmit={this.handleSubmit} {...this.props} />
    }
}

NewMeetingContainer.propTypes = propTypes;
