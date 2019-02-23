import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {Grid, IconButton} from '@material-ui/core/';

import {AddShoppingCart, Delete, Search, Create, Cake} from '@material-ui/icons';

class BatchActionButton extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
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
                    const searchCriteria = this.props.batchItems.map(food => {
                            return food.food_name
                        }).join(' ')
                    this.props.dispatch({
                        type: 'FETCH_RECIPES',
                        payload: searchCriteria})
                    this.props.dispatch({
                        type: 'RECIPE_SEARCH_VALUE', 
                        payload: searchCriteria})
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
                actionButtonDescription = <AddShoppingCart />;
                break;
            case ('Used Up'):
                actionButtonDescription = <Delete/> ;
                break;
            case ('Find Recipes'):
                actionButtonDescription = <Search />;
                break;
            case ('Update Tags'):
                actionButtonDescription = <Create />;
                break;
            default:
                actionButtonDescription = '';
        }

        return (
            <Grid>
                {this.props.batchAction === '' ? 
                    <IconButton style={{visibility: 'hidden'}}>
                        <Cake />
                    </IconButton> :
                    <IconButton onClick={this.handleActionButton}
                        variant="outlined"
                        style={{ backgroundColor: '#ff5d55'}}>
                        {actionButtonDescription}</IconButton>}
            </Grid>
        )
    }
}

const BatchActionButtonWithRouter = withRouter(BatchActionButton);

const mapRStoProps = (rs) => {
    return {
        pantry: rs.pantry.pantry,
        batchItems: rs.pantry.batchItems,
        batchAction: rs.pantry.batchAction,
    }
}

export default connect(mapRStoProps)(BatchActionButtonWithRouter);