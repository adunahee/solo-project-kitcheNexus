import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodToAddListItem from './FoodToAddListItem';

import DialogContentText from '@material-ui/core/DialogContentText';



class FoodToAddList extends Component {

    buildList = () => {
        console.log('in build list');

        let pendingArr;
        if (this.props.pageView === 'GROCERY') {
            pendingArr = this.props.pendingGroceryItems;
        } else {
            pendingArr = this.props.pendingPantryItems;
        }
        return pendingArr.map((item, i) => {
            return <FoodToAddListItem item={item} key={i} index={i} pageView={this.props.pageView} />
        })
    }

    render() {
        return (
            <div>
                <DialogContentText>Food to Add: Tap to Remove</DialogContentText>
                {this.props.pendingGroceryItems.length > 0 && 
                this.buildList()}
                {this.props.pendingPantryItems.length > 0 &&
                    this.buildList()}
            </div>
        )
    }
}

const mapRStoProps = (rs) => {
    return {
        pendingGroceryItems: rs.grocery.pendingGroceryItems,
        pendingPantryItems: rs.pantry.pendingPantryItems,
    }
}

export default connect(mapRStoProps)(FoodToAddList);
