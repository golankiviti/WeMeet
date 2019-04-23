import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'immutable-prop-types';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import rbcStyles from 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './calendar.module.scss';
import { getMeetings } from '../../clientManager/meetingsClientManager';
import NewMeetingContainer from '../personalZone/meetings/newMeeting/NewMeetingContainer';
import 'moment/locale/he';

const propTypes = {
    // user: ImmutablePropTypes.map.isRequired //redux
}

export class CalendarContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meetings: [],
            showMeetingDialog: false,
            selectedMeeting: Map()
        };

        this.closeMeetingDialog = this.closeMeetingDialog.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.localizer = BigCalendar.momentLocalizer(moment);
        this.messages = {
            previous: 'הקודם',
            next: 'הבא',
            today: 'היום',
            month: 'חודש',
            week: 'שבוע',
            day: 'יום',
        };
    }

    componentDidMount() {
        this.getMeetings();
    }

    getMeetings() {
        getMeetings(this.props.user.get('_id'))
            .then(res => {
                const meetings = res.map(meeting =>
                    ({
                        id: meeting._id,
                        title: meeting.name,
                        start: new Date(meeting.fromDate),
                        end: new Date(meeting.toDate),
                        invited: meeting.invited,
                        location: meeting.location
                    }));

                this.setState({ meetings });
            });
    }

    handleSelect(meeting) {
        const selectedMeeting = Map({
            _id: meeting.id,
            name: meeting.title,
            fromDate: meeting.start.toISOString(),
            toDate: meeting.end.toISOString(),
            invited: List(meeting.invited),
            location: meeting.location
        });

        this.setState({ showMeetingDialog: true, selectedMeeting });
    }

    closeMeetingDialog() {
        this.setState({
            showMeetingDialog: false,
            selectedMeeting: Map()
        });
    }

    render() {
        return (
            <Fragment>
                <div className={styles.calendarContainer}>
                    <BigCalendar
                        localizer={this.localizer}
                        events={this.state.meetings}
                        views={['month', 'week', 'day']}
                        showMultiDayTimes
                        messages={this.messages}
                        onSelectEvent={this.handleSelect}
                    />
                </div>
                {
                    this.state.showMeetingDialog &&
                    <NewMeetingContainer
                        onClose={this.closeMeetingDialog}
                        meeting={this.state.selectedMeeting}
                        title={this.state.selectedMeeting.get('name')} />
                }
            </Fragment>
        );
    }
}

CalendarContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(CalendarContainer);
