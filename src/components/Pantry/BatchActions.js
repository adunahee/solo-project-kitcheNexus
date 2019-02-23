import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

class BatchActions extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    handleActionChange = (event) => {
        this.props.dispatch({ type: 'CLEAR_BATCH_ITEMS' });
        this.props.dispatch({ type: 'SET_ACTION', payload: event.target.value });
    }

    checkColor = () => {
        if (this.props.batchAction === ''){
            return '#ffb4b0'
        } else {
            return '#ff5d55'
        }
    }

    render() {


        return (
            <Grid container>
                <select value={this.props.batchAction}
                    onChange={this.handleActionChange}
                    style={{
                        height: '100%',
                        textAlignLast: 'center',
                        fontSize: '1rem',
                        backgroundColor: this.checkColor(),
                    }}
                        autoWidth={true}>
                        <option value=''>
                    Many Item Update?</option>
                <option value='Buy More'>
                    Buy More</option>
                <option value='Used Up'>
                    Used Up</option>
                <option value='Find Recipes'>
                    Find Recipes</option>
                <option value='Update Tags'>
                    Update Tags</option>
                    </select>
                </Grid >
        )
    }
}

const BatchActionsWithRouter = withRouter(BatchActions);

const mapRStoProps = (rs) => {
    return {
        pantry: rs.pantry.pantry,
        batchItems: rs.pantry.batchItems,
        batchAction: rs.pantry.batchAction,
    }
}

export default connect(mapRStoProps)(BatchActionsWithRouter);
