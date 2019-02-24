import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodSearchBar from './FoodSearchBar';
import FoodToAddList from './FoodToAddList';

import {Button, Dialog, DialogActions, DialogTitle, Slide, AppBar, Toolbar, IconButton, Typography, Grid, Fab } from '@material-ui/core';
import {Close as CloseIcon, Add as AddIcon, Fastfood as FoodIcon} from '@material-ui/icons';

import './FoodSearchBar.css';

class FoodFormPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let action = {};
        if (this.props.pageView === 'GROCERY') {
            action = {
                type: `ADD_FOOD_TO_GROCERY`,
                payload: {
                    groceries: this.props.pendingGroceryItems,
                    listName: this.props.listName
                }
            }
        } else if (this.props.pageView === 'PANTRY') {
            action = {
                type: `ADD_FOOD_TO_PANTRY`,
                payload: this.props.pendingPantryItems
            }
        }

        this.props.dispatch(action);
        this.handleClose();
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    //dispatches food item to pendingPantry reducer for storage until all items added
    handleAdd = () => {
        this.props.dispatch({ type: `ADD_TO_PENDING_${this.props.pageView}`, payload: this.props.foodSearchValue })
        this.props.dispatch({ type: 'CLEAR_VALUE' });
    }

    handleClear = () => {
        this.props.dispatch({ type: `CLEAR_PENDING_${this.props.pageView}` });
    }

    transition = (props) => {
        return <Slide direction="up" {...props} />;
    }

    getClass = () => {
        switch (this.props.pageView) {
            case ('PANTRY'):
                return 'food-popup-bar-pantry';
            case ('GROCERY'):
                return 'food-popup-bar-grocery';
            default:
                return '';
        }
    }

    checkForDuplicates = (pageView, item) => {
        switch (pageView) {
            case ('PANTRY'):
                if (this.props.pantry.filter(pantryItem => pantryItem.food_name === item).length > 0) {
                    return 'already in pantry';
                } else { return '' }
            case ('GROCERY'):
                if (this.props.grocery.filter(groceryItem => groceryItem.name === item).length > 0) {
                    return 'already on a list';
                } else { return '' }
            default:
                return '';
        }
    }

    render() {

        return (
            <Grid container
                justify='center'>
                <Fab aria-label="Add Food"
                    onClick={this.handleOpen} 
                    size='medium'>
                    <AddIcon fontSize='small'/>
                    <FoodIcon fontSize='small'/>
                </Fab>
                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    TransitionComponent={this.transition}
                    fullScreen>
                    <AppBar position='relative' className={this.getClass()}>
                        <Toolbar >
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" >
                                {this.props.pageView === 'GROCERY' ? 'Adding Food to Grocery List' : `Adding Food to Pantry`}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container
                        alignItems='center'
                        direction='column'
                        spacing={24}>

                        <Grid item>
                            <Grid container
                                spacing={8}
                                direction='column'
                                justify="space-evenly"
                                alignItems="center">

                                <form onSubmit={this.handleSubmit}>
                                    <Grid item>
                                        <DialogTitle>
                                            {this.props.listName !== undefined ? `${this.props.listName}` : `What's already in your pantry?`}
                                        </DialogTitle>
                                    </Grid>
                                    <Grid item>
                                        <FoodSearchBar pageView={this.props.pageView} />
                                    </Grid>
                                    <Grid item>
                                        <DialogActions>
                                            <Button onClick={this.handleAdd} color='primary' variant="outlined">
                                                Add</Button>
                                            <Button onClick={this.handleClear} color='secondary' variant="outlined">
                                                Clear All</Button>
                                            <Button type='submit' variant="outlined">
                                                {this.props.pageView === 'GROCERY' && 'Finalize List'}
                                                {this.props.pageView === 'PANTRY' && 'Update Pantry'}
                                            </Button>
                                        </DialogActions>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <FoodToAddList pageView={this.props.pageView} />
                        </Grid>


                    </Grid>
                </Dialog>
            </Grid>

        )
    }
}

const mapRStoProps = (rs) => {
    return {
        pendingGroceryItems: rs.grocery.pendingGroceryItems,
        pendingPantryItems: rs.pantry.pendingPantryItems,
        foodSearchValue: rs.food.foodSearchValue,
    }
}

export default connect(mapRStoProps)(FoodFormPopup);
