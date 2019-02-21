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
        this.props.dispatch({type: 'CLEAR_BATCH_ITEMS'});
        this.props.dispatch({type: 'SET_ACTION', payload: event.target.value });
    }

    handleActionButton = () => {
        if (this.props.batchItems.length === 0) {
            return alert('You must select at least one item in the table below first.');
        } else {
            switch (this.props.batchAction) {
                case ('Buy More'):
                    return this.props.dispatch({
                        type: 'ADD_FOOD_TO_GROCERY',
                        payload: {
                            groceries: this.props.batchItems.map(food => {
                                return food.food_name;
                            })
                        }
                    })
                case ('Used Up'):
                    return this.props.dispatch({
                        type: 'REMOVE_FROM_PANTRY',
                        payload: this.props.batchItems,
                    })
                case ('Find Recipes'):
                    this.props.dispatch({
                        type: 'FETCH_RECIPES',
                        payload: this.props.batchItems.map(food => {
                            return food.food_name
                        }).join(' '),
                    })
                    return this.props.history.push('/recipes/browse');
                case ('Update Tags'):
                    return this.props.dispatch({
                        type: 'UPDATE_TAGS',
                        payload: this.props.batchItems,
                    })
                default:
                    return null;
            }
        }

    }

    render() {
        let actionButtonDescription;
        switch (this.props.batchAction) {
            case ('Buy More'):
                actionButtonDescription = 'Add To Groceries';
                break;
            case ('Used Up'):
                actionButtonDescription = 'Remove';
                break;
            case ('Find Recipes'):
                actionButtonDescription = 'Begin Search';
                break;
            case ('Update Tags'):
                actionButtonDescription = 'Set Tags';
                break;
            default:
                actionButtonDescription = '';
        }

        return (
            <Grid item>
                <select value={this.props.batchAction} onChange={this.handleActionChange}>
                    <option value=''>
                        Many Item Update?
                    </option>
                    <option value='Buy More'>
                        Buy More
                    </option>
                    <option value='Used Up'>
                        Used Up
                    </option>
                    <option value='Find Recipes'>
                        Find Recipes
                    </option>
                    <option value='Update Tags'>
                        Update Tags
                    </option>
                </select>
                {this.props.batchAction !== '' && <button onClick={this.handleActionButton}>{actionButtonDescription}</button>}
            </Grid>
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
