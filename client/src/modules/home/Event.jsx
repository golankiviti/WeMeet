import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteMeeting } from '../../clientManager/meetingsClientManager';
import { deleteRestriction } from '../../clientManager/userManager';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRefresh } from '../../redux/refresh/actionCreators';
import { home } from '../../redux/refresh/refreshFields';
import styles from './calendar.module.scss';

const propTypes = {
    // user: ImmutablePropTypes.map.isRequired //redux,
    event: PropTypes.object.isRequired,
    updateRefresh: PropTypes.func.isRequired
}

export class Event extends Component {
    deleteRestriction(restrictionId, e) {
        e.preventDefault();
        e.stopPropagation();
        deleteRestriction(restrictionId).then(() => {
            this.props.updateRefresh(home);
        });
    }

    deleteMeeting(meetingId, e) {
        e.preventDefault();
        e.stopPropagation();
        deleteMeeting(meetingId).then(() => {
            this.props.updateRefresh(home);
        });
    }

    render() {
        const { event, user } = this.props;
        return (
            <div>
                {event.title}
                {event.type === 'restriction' &&
                    <span title='מחק אילוץ'>
                        <DeleteIcon className={styles.deleteIcon} onClick={(e) => this.deleteRestriction(event.id, e)} />
                    </span>
                }
                {event.type === 'meeting' && event.creator === user.get('_id') &&
                    <span title='בטל פגישה'>
                        <DeleteIcon className={styles.deleteIcon} onClick={(e) => this.deleteMeeting(event.id, e)} />
                    </span>
                }

            </div>
        );
    }
}

Event.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateRefresh,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);