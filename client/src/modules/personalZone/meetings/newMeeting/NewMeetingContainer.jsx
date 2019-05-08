import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'immutable-prop-types';
import { getAllUsers, userLocations } from '../../../../clientManager/userManager';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { bindActionCreators } from 'redux';
import { createMeeting, updateMeeting } from '../../../../clientManager/meetingsClientManager';
import PropTypes from 'prop-types';
import { updateRefresh } from '../../../../redux/refresh/actionCreators';
import { myMeetings as myMeetingsKey, home } from '../../../../redux/refresh/refreshFields';
import moment from 'moment';
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
        userLocations(this.props.user.get('_id'))
            .then(res => {
                const locations = fromJS(
                    res.map(location =>
                        ({
                            label: location.name
                        }))
                );
                this.setState({ locations });
            });
    }

    handleSubmit = values => {
        const { user, meeting, onClose, updateRefresh } = this.props;
        const meetingToSend = Object.assign({},
            values,
            {
                creator: user.get('_id'),
                location: values.location.label,
                invited: values.invited.map(user => user.value)
            });
        if (meeting) {
            meetingToSend['_id'] = meeting.get('_id');
            updateMeeting(meetingToSend).then(() => {
                updateRefresh(myMeetingsKey);
                updateRefresh(home);
            });
        }
        else {
            createMeeting(meetingToSend).then(() => {
                Swal.fire(
                    'בקשתך לפגישה חדשה התקבלה בהצלחה',
                    'תוכל לראות את מועד הפגישה בלוח השנה שלך ובאיזור האישי החל ממחר',
                    'success'
                );
                updateRefresh(myMeetingsKey);
            });
        }
        onClose();
    }

    getAllUsers() {
        getAllUsers()
            .then(res => {
                const users = fromJS(
                    res.filter(user => user._id !== this.props.user.get('_id'))
                        .map(user => ({
                            value: user._id,
                            label: user.firstName + ' ' + user.lastName
                        })));
                this.setState({ users });
            });
    }

    render() {
        const { users, locations } = this.state;
        const { meeting } = this.props;

        let initialValues = {}
        if (meeting) {

            initialValues = {
                name: this.props.meeting.get('name'),
                fromDate: moment(meeting.get('fromDate')).format('YYYY-MM-DDTHH:mm:ss').substring(0, 16),
                toDate: moment(meeting.get('toDate')).format('YYYY-MM-DDTHH:mm:ss').substring(0, 16),
                invited:
                    meeting.get('invited').map(userId => {
                        return users.find(user => user.get('value') === userId)
                    }).toJS(),
                location: { label: meeting.get('location'), value: meeting.get('location') },
                actualDate: meeting.get('actualDate') ?
                    moment(meeting.get('actualDate')).format('YYYY-MM-DDTHH:mm:ss').substring(0, 16) :
                    ''
            }
        }

        return <NewMeeting
            locations={locations}
            users={users}
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
            disabled={meeting && (meeting.get('creator') !== this.props.user.get('_id'))}
            {...this.props} />
    }
}

NewMeetingContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateRefresh,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMeetingContainer);
