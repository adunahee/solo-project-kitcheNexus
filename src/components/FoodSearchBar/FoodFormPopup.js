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

    render() {
        return (
            <div>
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
                    <AppBar position='relative'>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" >
                                {this.props.listName ? `${this.props.listName} List` : `Updating Pantry`}
            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle>
                            {this.props.pageView ==='GROCERY' ? 'Adding Groceries' : `What's in your pantry?`}
                        </DialogTitle>
                        <div >
                            <DialogContentText>
                                Type 2 letters and food will appear!
                            </DialogContentText>
                            <FoodSearchBar pageView={this.props.pageView} />


                        </div>
                        <DialogActions>
                            {this.props.pageView === "RECIPE" ? null :
                                <div>
                                    <Button onClick={this.handleAdd} color='primary'>
                                        Add
                                </Button>
                                    <Button onClick={this.handleClear} color='secondary'>
                                        Clear All
                                </Button>
                                    <Button type='submit'>Finalize List</Button>
                                </div>
                            }
                        </DialogActions>
                    </form>
                    <DialogContent>
                            <div>
                                <DialogContentText>Items to Add</DialogContentText>
                            {this.props.pageView === 'GROCERY' && this.props.pendingGroceryItems.length > 0 &&
                                <ul>
                                    {this.props.pendingGroceryItems.map((item, i) => {
                                        return <li key={i}> {item} </li>
                                    })}
                                </ul>}
                            {this.props.pageView === 'PANTRY' && this.props.pendingPantryItems.length > 0 &&
                                <ul>
                                    {this.props.pendingPantryItems.map((item, i) => {
                                        return <li key={i}> {item} </li>
                                    })}
                                </ul>}
                            </div>
                    </DialogContent>
                </Dialog>
            </div>

        )
    }
}

const mapRStoProps = (rs) => {
    return {
        pendingGroceryItems: rs.grocery.pendingGroceryItems,
        pendingPantryItems: rs.food.pendingPantryItems,
        foodSearchValue: rs.food.foodSearchValue,
    }
}

export default connect(mapRStoProps)(FoodFormPopup);
