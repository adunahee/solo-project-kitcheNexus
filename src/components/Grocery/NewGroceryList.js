import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Button, TextField, Dialog, DialogActions, 
    DialogContent, DialogContentText, DialogTitle, 
    IconButton, Grid} from '@material-ui/core/';

import {PlaylistAdd} from '@material-ui/icons';

class NewGroceryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listName: null,
        }
    }

    handleCreateNewList = () => {
        this.props.dispatch({type: 'CREATE_NEW_GROCERY_LIST', payload: this.state.listName})
        this.handleClose();
        this.setState({listName: null})
    }

    updateName = (event) => {
        this.setState({listName: event.target.value})
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

  render() {
    return (
      <Grid container
        justify='center'>
            <IconButton onClick={this.handleOpen} style={{ backgroundColor: '#e0e0e0'}}> 
            <PlaylistAdd /> </IconButton>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Creating New Grocery List</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Name your list.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="eg 'Target' or 'Party Supplies'"
                        type="email"
                        fullWidth
                        value={this.state.listName === null ? '' : this.state.listName}
                        onChange={this.updateName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={this.handleCreateNewList} color="secondary">
                        Create
          </Button>
                </DialogActions>
            </Dialog>
      </Grid>
    )
  }
}

export default connect()(NewGroceryList)