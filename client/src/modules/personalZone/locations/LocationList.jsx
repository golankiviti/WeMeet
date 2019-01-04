import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Location from './Location';
import AddLocation from './locationDialogs/AddLocation';
import styles from './locationList.module.scss';

const propTypes = {
    locations: ImmutablePropTypes.list.isRequired
};

class LocationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addDialogOpen: false
        }
    }

    handleCloseAddDialog = () => {
        this.setState({
            addDialogOpen: false
        });
    }

    handleOpenAddDialog = () => {
        this.setState({
            addDialogOpen: true
        });
    }

    render() {
        return <Card raised
            className={styles.container}>
            <div className={styles.header}>המיקומים שלי</div>
            <div className={styles.content}>
                {
                    this.props.locations.map(x => 
                        <Location key={x.get('_id')}
                            id={x.get('_id')}
                            name={x.get('name')} />
                    )
                }
            </div>
            <Button onClick={this.handleOpenAddDialog}>
                <Icon>add</Icon>
            </Button>
            {
                this.state.addDialogOpen && <AddLocation onClose={this.handleCloseAddDialog}/>
            }
        </Card>
    }
}

LocationList.propTypes = propTypes;

export default LocationList;