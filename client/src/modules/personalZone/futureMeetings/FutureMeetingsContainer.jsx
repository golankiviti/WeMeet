import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, fromJS } from 'immutable';
import { registerRefresh, updateRefresh, unregisterRefresh } from '../../../redux/refresh/actionCreators';
import { futureMeetings as futureMeetingsKey } from '../../../redux/refresh/refreshFields';
import { getFutureMeetings } from '../../../clientManager/meetingsClientManager';
import FutureMeetings from './FutureMeetings';

const propTypes = {
    userId: PropTypes.string,
    timestamp: PropTypes.number,
    registerRefresh: PropTypes.func,
    updateRefresh: PropTypes.func,
    unregisterRefresh: PropTypes.func
}

function FutureMeetingsContainer(props) {
    const [futureMeetings, setFutureMeetings] = useState(List())
    const [isBusy, setBusy] = useState(false)

    useEffect(() => {
        props.registerRefresh(futureMeetingsKey);

        return () => props.unregisterRefresh(futureMeetingsKey);
    }, [])

    useEffect(() => {
        setBusy(true)
        getFutureMeetings(props.userId)
            .then(res => {
                setBusy(false)
                setFutureMeetings(fromJS(res))
            })
    }, [props.timestamp])

    return <FutureMeetings isBusy={isBusy}
        meetings={futureMeetings} />
}

FutureMeetingsContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userId: state.user ? state.user.get('_id') : '',
    timestamp: state.refresh[futureMeetingsKey]
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerRefresh,
        updateRefresh,
        unregisterRefresh
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FutureMeetingsContainer);