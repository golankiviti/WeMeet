import React, { Component } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NewMeetingContainer from '../newMeeting/NewMeetingContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import ImmutablePropTypes from 'immutable-prop-types';
import { deleteMeeting } from '../../../../clientManager/meetingsClientManager';
import { myMeetings } from '../../../../redux/refresh/refreshFields';
import { updateRefresh } from '../../../../redux/refresh/actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './myMeetings.module.scss';

const propTypes = {
    meeting: ImmutablePropTypes.map.isRequired
}

export class Meeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewMeetingDialog: false
        }
        this.handleNewMeetingClick = this.handleNewMeetingClick.bind(this);
        this.closeNewMeetingDialog = this.closeNewMeetingDialog.bind(this);
        this.deleteMeeting = this.deleteMeeting.bind(this);
    }

    handleNewMeetingClick() {
        this.setState({ showNewMeetingDialog: true })
    }

    closeNewMeetingDialog() {
        this.setState({ showNewMeetingDialog: false })
    }

    deleteMeeting() {
        deleteMeeting(this.props.meeting.get('_id')).then(() => {
            this.props.updateRefresh(myMeetings);
        });
    }

    render() {
        const { meeting, user } = this.props;
        return (
            <div>
                <span>{meeting.get('name')} -
                {meeting.get('actualDate') ?
                        new Date(meeting.get('actualDate')).toLocaleDateString() :
                        'עדיין לא נקבע תאריך'
                    }
                </span>
                <VisibilityIcon className={styles.editIcon} onClick={this.handleNewMeetingClick} />
                {
                    meeting.get('creator') === user.get('_id') &&
                    <DeleteIcon className={styles.editIcon} onClick={this.deleteMeeting} />
                }

                {
                    this.state.showNewMeetingDialog &&
                    <NewMeetingContainer onClose={this.closeNewMeetingDialog} meeting={meeting} title={meeting.get('name')} />
                }
            </div>

        );
    }
}

Meeting.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateRefresh,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);