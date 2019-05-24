import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'immutable-prop-types';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import BigCalendar from 'react-big-calendar';
import { bindActionCreators } from 'redux';
import { registerRefresh, unregisterRefresh } from '../../redux/refresh/actionCreators';
import { home } from '../../redux/refresh/refreshFields';
import moment from 'moment';
import rbcStyles from 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './calendar.module.scss';
import { getMeetings } from '../../clientManager/meetingsClientManager';
import { getRestrictions } from '../../clientManager/userManager';
import NewMeetingContainer from '../personalZone/meetings/newMeeting/NewMeetingContainer';
import 'moment/locale/he';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRestriction from './restrictions/restrictionDialogs/AddRestriction';
import Event from './Event';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import EditRestriction from '../home/restrictions/restrictionDialogs/EditRestriction';

const propTypes = {
    // user: ImmutablePropTypes.map.isRequired //redux
}

export class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            showMeetingDialog: false,
            showRestrictionDialog: false,
            selectedMeeting: Map(),
            selectedRestriction: {},
            addDialogOpen: false,
            isBusy: false
        };

        this.closeMeetingDialog = this.closeMeetingDialog.bind(this);
        this.closeRestrictionDialog = this.closeRestrictionDialog.bind(this);
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
        this.props.registerRefresh(home);
        this.getMeetings();
    }

    componentWillUnmount() {
        this.props.unregisterRefresh(home);
    }

    componentDidUpdate(prevProps) {
        if (this.props.timestamp !== prevProps.timestamp) {
            this.getMeetings();
        }
    }

    getMeetings() {
        this.setState({ isBusy: true })
        {
            Promise.all(
                [getMeetings(this.props.user.get('_id')),
                getRestrictions(this.props.user.get('_id'))])
                .then(res => {
                    const meetings = res[0].map(meeting => {
                        if (meeting.isDetermined) {
                            return {
                                id: meeting._id,
                                title: meeting.name,
                                start: new Date(meeting.actualDate),
                                end: new Date(new Date(meeting.actualDate).setHours(new Date(meeting.actualDate).getHours() + meeting.duration)),
                                invited: meeting.invited,
                                location: meeting.location,
                                creator: meeting.creator,
                                duration: meeting.duration,
                                actualDate: new Date(meeting.actualDate),
                                isDetermined: meeting.isDetermined,
                                color: '#2196f3',
                                type: 'meeting'
                            }
                        }
                        return null;
                    }).filter((item) => item !== null);
                    const restrictions = res[1].map(meeting =>
                        ({
                            id: meeting._id,
                            title: meeting.name,
                            start: new Date(meeting.startDate),
                            end: new Date(meeting.endDate),
                            color: 'green',
                            type: 'restriction'
                        }));
                    const events = meetings.concat(restrictions);
                    this.setState({
                        events,
                        isBusy: false
                    });
                });
        }
    }

    eventStyleGetter(event, start, end, isSelected) {
        console.log(event);
        var backgroundColor = event.color;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    handleSelect(meeting) {
        if (meeting.type === 'meeting') {
            const selectedMeeting = Map({
                _id: meeting.id,
                name: meeting.title,
                fromDate: meeting.start.toISOString(),
                toDate: meeting.end.toISOString(),
                invited: List(meeting.invited),
                location: meeting.location,
                duration: meeting.duration,
                creator: meeting.creator,
                actualDate: meeting.actualDate.toISOString(),
                isDetermined: meeting.isDetermined
            });

            this.setState({ showMeetingDialog: true, selectedMeeting });
        } else {
            const selectedRestriction = {
                id: meeting.id,
                name: meeting.title,
                startDate: moment(meeting.start).format('YYYY-MM-DDTHH:mm:ss').substring(0, 16),
                endDate: moment(meeting.end).format('YYYY-MM-DDTHH:mm:ss').substring(0, 16),
            };

            this.setState({ showRestrictionDialog: true, selectedRestriction });
        }
    }

    closeMeetingDialog() {
        this.setState({
            showMeetingDialog: false,
            selectedMeeting: Map()
        });
    }

    closeRestrictionDialog() {
        this.setState({
            showRestrictionDialog: false,
            selectedRestriction: Map()
        });
    }

    handleOpenAddDialog = () => {
        this.setState({
            addDialogOpen: true
        });
    }

    handleCloseAddDialog = () => {
        this.setState({
            addDialogOpen: false
        });
    }

    render() {
        const calendarClasses = classNames(styles.calendarContainer, {
            [styles.busy]: this.state.isBusy
        })
        return (
            <Fragment>
                {
                    this.state.isBusy &&
                    <div className={styles.busyContainer}>
                        <CircularProgress />
                    </div>
                }
                <div className={calendarClasses}>
                    <BigCalendar
                        localizer={this.localizer}
                        events={this.state.events}
                        views={['month', 'week', 'day']}
                        showMultiDayTimes
                        messages={this.messages}
                        onSelectEvent={this.handleSelect}
                        eventPropGetter={(this.eventStyleGetter)}
                        components={{
                            event: Event,
                        }}
                        tooltipAccessor={null}
                    />
                </div>
                {
                    this.state.showMeetingDialog &&
                    <NewMeetingContainer
                        onClose={this.closeMeetingDialog}
                        meeting={this.state.selectedMeeting}
                        title={this.state.selectedMeeting.get('name')} />
                }
                {
                    this.state.showRestrictionDialog &&
                    <EditRestriction
                        onClose={this.closeRestrictionDialog}
                        restriction={this.state.selectedRestriction} />
                }
                <Fab className={styles.addButton} color='primary' aria-label='Add' onClick={this.handleOpenAddDialog}>
                    <AddIcon />
                </Fab>
                {
                    this.state.addDialogOpen &&
                    <AddRestriction onClose={this.handleCloseAddDialog} />
                }
            </Fragment>
        );
    }
}

HomeContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user,
    timestamp: state.refresh[home]
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerRefresh,
        unregisterRefresh
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
