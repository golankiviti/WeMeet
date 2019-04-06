import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MeetingForApproval from './MeetingForApproval';

const propTypes = {
    meetings: ImmutablePropTypes.list.isRequired,
    onApprove: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
};

function MeetingsForApproval({meetings, onApprove, onDecline}) {
    return <div>
        {
            meetings.map(x => <MeetingForApproval key={x.get('_id')}
                id={x.get('_id')}
                name={x.get('name')}
                date='ssss'
                onApprove={onApprove}
                onDecline={onDecline} />
            )
        }
    </div>
}

MeetingsForApproval.propTypes = propTypes;

export default MeetingsForApproval;