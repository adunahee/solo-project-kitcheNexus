import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class GroceryFormPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_FOOD_TO_GROCERY', payload: this.props.pendingGroceryItems })
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

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen}> Add Groceries </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id='form-dialog-title'> Adding Groceries to {this.props.listName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Type 2 letters and food will appear!
                        </DialogContentText>
                        <form onSubmit={this.handleSubmit}>
                            <FoodSearchBar pageView='GROCERY' />
                            {this.props.pendingGroceryItems.length > 0 &&
                                <div>
                                    <h2>Items to Add</h2>
                                    <ul>
                                        {this.props.pendingGroceryItems.map((item, i) => {
                                            return <li key={i}> {item} </li>
                                        })}
                                    </ul>
                                </div>}
                            <button type='submit'>Finalize List</button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        {this.props.pantryView === "RECIPE" ? null :
                            <div>
                                <Button onClick={this.handleAdd} color='primary'>
                                    Add
                                </Button>
                                <Button onClick={this.handleClear} color='secondary'>
                                    Clear
                                </Button>
                            </div>
                        }
                    </DialogActions>

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
