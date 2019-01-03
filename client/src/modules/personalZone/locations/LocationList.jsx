import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from '@material-ui/core/Card';
import Location from './Location';
import styles from './locationList.module.scss';

const propTypes = {
    locations: ImmutablePropTypes.list.isRequired
};

class LocationList extends Component {
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
        </Card>
    }
}

LocationList.propTypes = propTypes;

export default LocationList;