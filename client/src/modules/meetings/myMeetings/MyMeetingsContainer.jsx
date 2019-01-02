import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import MyMeetings from './MyMeetings';

export default class MyMeetingsContainer extends Component {
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
        // TODO: meetingsClientManager.getMeetings -> state.meetings
        this.setState({
            meetings: fromJS([
                {
                    id: 1,
                    name: 'פגישה 3 עם איגור',
                    participants: [{ id: 1, name: 'עידן' }, { id: 2, name: 'גיל' }],
                    locations: { id: 'colman', name: 'המכללה למנהל' },
                    date: '2019-02-10T01:01'
                },
                {
                    id: 2,
                    name: 'בירה עם גולן',
                    participants: [{ id: 1, name: 'עידן' }, { id: 3, name: 'גולן' }],
                    locations: { id: 'chouf', name: 'שוף' },
                    date: '2019-01-10T01:01'
                }
            ])
        })
    }

    render() {
        const { meetings } = this.state;
        return <MyMeetings meetings={meetings}/>
    }
}