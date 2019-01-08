import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Location from './Location';
import AddLocation from './locationDialogs/AddLocation';
import EditLocation from './locationDialogs/EditLocation';
import styles from './locationList.module.scss';

const propTypes = {
    locations: ImmutablePropTypes.list.isRequired,
    userId: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

class LocationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addDialogOpen: false,
            editLocatonId: undefined
        }
    }

    handleCloseAddDialog = () => {
        this.setState({
            addDialogOpen: false
        }, this.props.refresh);
    }

    handleOpenAddDialog = () => {
        this.setState({
            addDialogOpen: true
        });
    }

    handleOpenEditDialog = (id) => {
        this.setState({
            editLocatonId: id
        })
    }

    handleCloseEditDialog = () => {
        this.setState({
            editLocatonId: undefined
        }, this.props.refresh)
    }

    render() {
        const { userId, onDelete } = this.props;

        return <Card raised
            className={styles.container}>
            <div className={styles.header}>המיקומים שלי</div>
            <div className={styles.content}>
                {
                    this.props.locations.map(x => 
                        <Location key={x.get('_id')}
                            id={x.get('_id')}
                            name={x.get('name')}
                            onEdit={this.handleOpenEditDialog}
                            onDelete={onDelete} />
                    )
                }
            </div>
            <Button onClick={this.handleOpenAddDialog}>
                <Icon>add</Icon>
            </Button>
            {
                this.state.addDialogOpen && 
                    <AddLocation userId={userId}
                        onClose={this.handleCloseAddDialog} />
            }
            {
                this.state.editLocatonId && 
                    <EditLocation userId={userId}
                        id={this.state.editLocatonId}
                        onClose={this.handleCloseEditDialog} />
            }
        </Card>
    }
}

LocationList.propTypes = propTypes;

export default LocationList;