import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'immutable-prop-types';
import { connect } from 'react-redux';
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
        this.getMeetings();
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
    user: state.user
});

export default connect(mapStateToProps)(MyMeetingsContainer);