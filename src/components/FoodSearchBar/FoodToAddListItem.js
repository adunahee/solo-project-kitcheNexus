import React, { Component } from 'react';
import { connect } from 'react-redux';


import ListItem from '@material-ui/core/ListItem';

class FoodToAddListItem extends Component {
    //warns user if item duplicated elsewhere
    checkForDuplicates = () => {
        const warning = ['( food is already'];
        switch (this.props.pageView) {
            case ('PANTRY'):
                if (this.props.pantry.filter(pantryItem => pantryItem.food_name === this.props.item).length > 0) {
                    warning.push('in your pantry )');
                    return warning.join(' ');
                } else { return '' }
            case ('GROCERY'):
                warning.push('on list:');
                //check to see if food is already on a give list and update warning
                this.props.grocery.forEach((groceryObj) => {
                    this.props.listNames.forEach((listObj) => {
                        const listCheck = groceryObj.list_name === listObj.list_name
                        const foodCheck = groceryObj.name === this.props.item
                        if (listCheck && foodCheck) {
                            warning.push(`"${listObj.list_name}"`);
                        }
                    })
                })
                //checks to see if item on any lists
                if (warning.length > 2) {
                    warning.push(')');
                    return warning.join(' ')
                } else {
                    return ''
                }
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
        listNames: rs.grocery.groceryListNames,
    }
}

export default connect(mapRStoProps)(FoodToAddListItem);
