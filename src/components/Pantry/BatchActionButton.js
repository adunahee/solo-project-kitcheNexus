import React, { Component } from 'react'
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class BatchActionButton extends Component {

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
            <Grid>
                {this.props.batchAction === '' ? 
                    <Button style={{visibility: 'hidden'}}>
                        Placeholder text to stop page jumping
                    </Button> :
                    <Button onClick={this.handleActionButton}
                        variant="outlined">
                        {actionButtonDescription}</Button>}
            </Grid>
        )
    }
}

const mapRStoProps = (rs) => {
    return {
        pantry: rs.pantry.pantry,
        batchItems: rs.pantry.batchItems,
        batchAction: rs.pantry.batchAction,
    }
}

export default connect(mapRStoProps)(BatchActionButton);