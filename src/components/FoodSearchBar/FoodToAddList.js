import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodToAddListItem from './FoodToAddListItem';

import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';


class FoodToAddList extends Component {

    buildList = () => {
        let pendingArr;
        if (this.props.pageView === 'GROCERY') {
            pendingArr = this.props.pendingGroceryItems;
        } else if (this.props.pageView === 'PANTRY'){
            pendingArr = this.props.pendingPantryItems;
        }
        return pendingArr.map((item, i) => {
            return <FoodToAddListItem item={item} key={i} index={i} pageView={this.props.pageView}/>
        })
    }

    render() {
        return (
            <Grid container
                direction='column'
                alignItems='flex-start'>
                <Grid item>
                    <DialogContentText>Food to Add: Tap to Remove</DialogContentText>
                </Grid>
                <Grid item>
                    <List>
                        {this.props.pendingGroceryItems.length > 0 &&
                            this.buildList()}
                        {this.props.pendingPantryItems.length > 0 &&
                            this.buildList()}
                    </List>
                </Grid>

            </Grid>
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
