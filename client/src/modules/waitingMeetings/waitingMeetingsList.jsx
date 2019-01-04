import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import styles from './waitingMeetingsList.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Meeting from './Meeting';

export default class WatingMeetingList extends Component {
    render() {
        const { meetings, handleConfirm, handleReject } = this.props;
        return (
            <Card raised
                className={styles.container}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            פגישות ממתינות לאישור
                        </Typography>
                    </Toolbar>
                </AppBar>
                {meetings.map((item) => (<Meeting meeting={item} onConfirm={handleConfirm} onReject={handleReject} key={item._id} />))}
            </Card>
        );
    }
}