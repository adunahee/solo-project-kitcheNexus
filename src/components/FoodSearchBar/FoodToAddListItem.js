import React, { Component } from 'react';
import { connect } from 'react-redux';


import ListItem from '@material-ui/core/ListItem';

class FoodToAddListItem extends Component {

    checkForDuplicates = () => {
        switch (this.props.pageView) {
            case ('PANTRY'):
                if (this.props.pantry.filter(pantryItem => pantryItem.food_name === this.props.item).length > 0) {
                    return '(already in pantry)';
                } else { return '' }
            case ('GROCERY'):
                if (this.props.grocery.filter(groceryItem => groceryItem.name === this.props.item).length > 0) {
                    return '(already on a list)';
                } else { return '' }
            default:
                return '';
        }
    }

    handleListItemClick = () => {
        switch (this.props.pageView) {
            case ('PANTRY'):
                return this.props.dispatch({ type: 'REMOVE_PENDING_PANTRY_ITEM', payload: this.props.index })
            case ('GROCERY'):
                return this.props.dispatch({ type: 'REMOVE_PENDING_GROCERY_ITEM', payload: this.props.index })
            default:
                break;
        }
    }

    render() {
        return (
            <ListItem 
                onClick={this.handleListItemClick}>
                {this.props.item} {this.checkForDuplicates()}
            </ListItem>
        )
    }
}

const mapRStoProps = (rs) => {
    return {
        pendingGroceryItems: rs.grocery.pendingGroceryItems,
        pendingPantryItems: rs.pantry.pendingPantryItems,
        pantry: rs.pantry.pantry,
        grocery: rs.grocery.grocery,
    }
}

export default connect(mapRStoProps)(FoodToAddListItem);
