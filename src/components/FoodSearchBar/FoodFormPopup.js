import React, { Component } from 'react';
import FoodSearchBar from './FoodSearchBar';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

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

    checkForDuplicates = (pageView) => {
        switch(pageView){
            case('PANTRY'):
                return 'in pantry';
            case('GROCERY'):
                return 'in grocery';
            default:
                return '';
        }
    }

    render() {

        return (
            <Grid item>
                {this.props.pageView === 'PANTRY' &&
                    <Button onClick={this.handleOpen}> Add Food to Pantry </Button>
                }
                {this.props.pageView === 'GROCERY' &&
                    <Button onClick={this.handleOpen}> Add Groceries </Button>
                }
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
                        justify='center'>

                        <form onSubmit={this.handleSubmit}>
                            <DialogTitle>
                                {this.props.listName !== undefined ? `${this.props.listName}` : `What's already in your pantry?`}
                            </DialogTitle>
                            <DialogContentText>
                                Type 2 letters and food will appear!
                            </DialogContentText>
                            <FoodSearchBar pageView={this.props.pageView} />
                            <DialogActions>
                                <Button onClick={this.handleAdd} color='primary'>
                                    Add
                                </Button>
                                <Button onClick={this.handleClear} color='secondary'>
                                    Clear All
                                </Button>
                                <Button type='submit'>
                                    {this.props.pageView === 'GROCERY' && 'Finalize List'}
                                    {this.props.pageView === 'PANTRY' && 'Update Pantry'}
                                </Button>
                            </DialogActions>
                        </form>
                        <br />
                        <DialogContent>
                            <div>
                                <DialogContentText>Items to Add</DialogContentText>
                                {this.props.pageView === 'GROCERY' && this.props.pendingGroceryItems.length > 0 &&
                                    <ul>
                                        {this.props.pendingGroceryItems.map((item, i) => {
                                            return <li key={i}> {item} {this.checkForDuplicates()}</li>
                                        })}
                                    </ul>}
                                {this.props.pageView === 'PANTRY' && this.props.pendingPantryItems.length > 0 &&
                                    <ul>
                                        {this.props.pendingPantryItems.map((item, i) => {
                                            return <li key={i}> {item} {this.checkForDuplicates(this.props.pageView)}</li>
                                        })}
                                    </ul>}
                            </div>
                        </DialogContent>

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
