import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRestriction from './restrictions/restrictionDialogs/AddRestriction';

class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addDialogOpen: false
        };
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
        return <div>
            <Fab color='primary' aria-label='Add' onClick={this.handleOpenAddDialog}>
                <AddIcon />
            </Fab>
            {
                this.state.addDialogOpen &&
                    <AddRestriction onClose={this.handleCloseAddDialog} />
            }
        </div>
    }
}

export default HomeContainer;