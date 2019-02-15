import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
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

class GroceryFormPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_FOOD_TO_GROCERY', payload: this.props.pendingGroceryItems });
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
        this.props.dispatch({ type: `ADD_TO_PENDING_GROCERY`, payload: this.props.foodSearchValue })
        this.props.dispatch({ type: 'CLEAR_VALUE' });
    }

    handleClear = () => {
        this.props.dispatch({ type: `CLEAR_PENDING_GROCERY` })
    }

    transition = (props) => {
        return <Slide direction="up" {...props} />;
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen}> Add Groceries </Button>
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
                                "{this.props.listName}" List
            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle>Adding Groceries</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Type 2 letters and food will appear!
                            </DialogContentText>
                            <FoodSearchBar pageView='GROCERY' />


                        </DialogContent>
                        <DialogActions>
                            {this.props.pantryView === "RECIPE" ? null :
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
                        {this.props.pendingGroceryItems.length > 0 &&
                            <div>
                                <DialogContentText>Items to Add</DialogContentText>
                                <ul>
                                    {this.props.pendingGroceryItems.map((item, i) => {
                                        return <li key={i}> {item} </li>
                                    })}
                                </ul>

                            </div>}
                    </DialogContent>
                </Dialog>
            </div>

        )
    }
}

const mapRStoProps = (rs) => {
    return {
        pendingGroceryItems: rs.grocery.pendingGroceryItems,
        foodSearchValue: rs.food.foodSearchValue,
    }
}

export default connect(mapRStoProps)(GroceryFormPopup);
