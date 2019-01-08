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
        getMeetings(this.props.user.get('email'))
            .then((res) => res.json())
            .then((res) => 
                this.setState({ meetings: fromJS(res) })
            );

        // this.setState({
        //     meetings: fromJS([
        //         {
        //             id: 1,
        //             name: 'פגישה 3 עם איגור',
        //             participants: [{ id: 1, name: 'עידן' }, { id: 2, name: 'גיייייל' }],
        //             location: { id: 1, name: 'המכללה למנהל' },
        //             fromDate: '2019-02-10T01:01',
        //             toDate: '2019-02-10T03:01'
        //         },
        //         {
        //             id: 2,
        //             name: 'בירה עם גולן',
        //             participants: [{ id: 1, name: 'עידן' }, { id: 3, name: 'איגור' }],
        //             location:  { id: 3, name: 'שלישות רמת גן' },
        //             fromDate: '2019-01-10T01:01',
        //             toDate: '2019-02-10T06:01'
        //         }
        //     ])
        // })
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