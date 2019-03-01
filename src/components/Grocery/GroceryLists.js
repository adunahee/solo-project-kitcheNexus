import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroceryListItem from '../Grocery/GroceryListItem';
import FoodFormPopup from '../FoodSearchBar/FoodFormPopup';

import {
    Grid, Typography, IconButton, List, ListItem,
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
} from '@material-ui/core'

import { ExpandMore, DeleteForever } from '@material-ui/icons';


class GroceryLists extends Component {

    //build individual list items
    buildListItem = () => {
        //creates array of just relevant list items
        const listItems = this.props.grocery.filter(
            (groceryItem, index) => { return groceryItem.list_name === this.props.list.list_name });
        //if array is not empty, generates list otherwise returns placeholder text
        if(listItems.length > 0){
            return listItems.map((groceryItem, index) => {
                return <GroceryListItem
                    groceryItem={groceryItem}
                    key={index} />
            })
        } else {
            return <ListItem>You have no grocery lists or groceries at this time.</ListItem>
        }   
    }

    handleDeleteList = () => {
        let confirmation = window.confirm('This will delete the list and all of its contents. Do you want to continue?')
        if (confirmation) {
            this.props.dispatch({ type: 'DELETE_LIST', payload: this.props.list.id })
        } else {
            alert('Delete canceled.')
        }
    }


    render() {
        return (
            <Grid item
                xs={8}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />} style={{ backgroundColor: '#a8c6fa' }}>
                        <Grid container
                            direction='row'
                            justify='space-between'
                            alignItems='center'>

                            <Grid item>
                                <FoodFormPopup listName={this.props.list.list_name} pageView='GROCERY' />
                            </Grid>

                            <Grid item>
                                <Typography align='center' style={{fontSize: '1rem'}}>
                                    {this.props.list.list_name}</Typography>
                            </Grid>

                            <Grid item>
                                <IconButton onClick={this.handleDeleteList} style={{ backgroundColor: '#e0e0e0', color: 'black'}}> <DeleteForever /> </IconButton>
                            </Grid>

                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List>
                            {this.buildListItem()}
                        </List>
                    </ExpansionPanelDetails>

                </ExpansionPanel>
            </Grid>
        )
    }
}

const mapRStoProps = (rs) => {
    return { grocery: rs.grocery.grocery }
}

export default connect(mapRStoProps)(GroceryLists);