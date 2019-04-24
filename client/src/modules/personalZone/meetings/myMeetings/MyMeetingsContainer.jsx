import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'immutable-prop-types';
import { bindActionCreators } from 'redux';
import { myMeetings } from '../../../../redux/refresh/refreshFields';
import { registerRefresh, unregisterRefresh } from '../../../../redux/refresh/actionCreators';
import MyMeetings from './MyMeetings';
import { getMeetings } from '../../../../clientManager/meetingsClientManager';

const propTypes = {
    // user: ImmutablePropTypes.map.isRequired //redux
}

export class MyMeetingsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meetings: List()
        };

        this.getMeetings = this.getMeetings.bind(this);
    }

    componentDidMount() {
        this.props.registerRefresh(myMeetings);
        this.getMeetings();
    }

    componentWillUnmount() {
        this.props.unregisterRefresh(myMeetings);
    }

    componentDidUpdate(prevProps) {
        if (this.props.timestamp !== prevProps.timestamp) {
            this.getMeetings();
        }
    }

    getMeetings() {
        getMeetings(this.props.user.get('_id'))
            .then(res =>
                this.setState({ meetings: fromJS(res) })
            );
    }

    render() {
        const { meetings } = this.state;
        return <MyMeetings meetings={meetings} />
    }
}

MyMeetingsContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user,
    timestamp: state.refresh[myMeetings]
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerRefresh,
        unregisterRefresh
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMeetingsContainer);