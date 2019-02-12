import React, { Component } from 'react';
import { connect } from 'react-redux';

class PantryListItem extends Component {

    handleClick = async () => {
        let confirmGone = window.confirm('Have you run out of this item?');
        if (confirmGone) {

            let confirmMore = await window.confirm('Do you want to order more?');
            this.props.dispatch({ type: 'REMOVE_FROM_PANTRY', payload: this.props.foodObj.pantry_id });
            if (confirmMore) {
                this.props.dispatch({ type: 'ADD_TO_LIST', payload: this.props.foodObj.food_id });
            } 
        } else {
            alert('Removal canceled.');
        }

    }

render() {
    return (
        <li onClick={this.handleClick}>
            {this.props.foodObj.food_name}
        </li>
    )
}
}

export default connect()(PantryListItem);
