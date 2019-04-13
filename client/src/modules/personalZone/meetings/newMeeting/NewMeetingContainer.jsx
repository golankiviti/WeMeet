import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'immutable-prop-types';
import { getAllUsers, userLocations } from '../../../../clientManager/userManager';
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
        this.getAllUsers = this.getAllUsers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getLocations();
        this.getAllUsers();
    }

    getLocations() {
        userLocations()
        .then(res => {
            const locations = fromJS(
                res.map(location =>
                    ({
                        id: location._id,
                        name: location.name
                    }))
            );
            this.setState({ locations });
        });
    }

    handleSubmit = values => {
        const { user, meeting, onClose } = this.props;
        const meetingToSend = Object.assign({}, values, { creator: user.get('_id') });
        if (meeting) {
            meetingToSend['_id'] = meeting.get('_id');
            updateMeeting(meetingToSend);
        }
        else {
            createMeeting(meetingToSend);
        }
        onClose();
    }

    getAllUsers() {
        getAllUsers()
            .then(res => {
                const users = fromJS(
                    res.map(user =>
                        ({
                            id: user._id,
                            name: user.firstName + ' ' + user.lastName
                        }))
                );
                this.setState({ users });
            });
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
