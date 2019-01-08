import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'immutable-prop-types';
//import { getLocations } from '../../../../clientManager/locationsClientManager';
//import { getUsers } from '../../../../clientManager/usersClientManager';
import { connect } from 'react-redux';
import { createMeeting, updateMeeting } from '../../../../clientManager/meetingsClientManager';
import PropTypes from 'prop-types';
import NewMeeting from './NewMeeting';

const propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    meeting: ImmutablePropTypes.map,
    // user: ImmutablePropTypes.map.isRequired //redux
}

export class NewMeetingContainer extends Component {
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
                { id: '1', name: 'הבית של עידן' },
                { id: '2', name: 'המכללה למנהל' },
                { id: '3', name: 'שלישות רמת גן' }
            ])
        })
    }

    handleSubmit = values => {
        const { user, meeting, onClose } = this.props;
        const meetingToSend = Object.assign({}, values, { creator: user.get('email') });
        if (meeting) {
            meetingToSend['_id'] = meeting.get('_id');
            updateMeeting(meetingToSend);
        }
        else {
            createMeeting(meetingToSend);
        }
        onClose();
    }

    getUsers() {
        // getUsers().then(res => {
        //     this.setState({ users: fromJS(res) });
        // })
        // .done();
        this.setState({
            users: fromJS([
                { id: 'ddd@aaa.com', name: 'עידן' },
                { id: 'bbb@bbb.com', name: 'איגור' },
                { id: 'ccc@ccc.com', name: 'גיייייל' }
            ])
        })
    }

    render() {
        const { users, locations } = this.state;
        return <NewMeeting locations={locations} users={users} onSubmit={this.handleSubmit} {...this.props} />
    }
}

NewMeetingContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(NewMeetingContainer);
