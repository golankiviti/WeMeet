import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';

export default class Meeting extends Component {
    render() {
        const { meeting } = this.props;
        return (
            <div>
                <span>{meeting.get('name')} - { new Date(meeting.get('date')).toLocaleDateString()}</span>
                <EditIcon/>
            </div>
        );
    }
}