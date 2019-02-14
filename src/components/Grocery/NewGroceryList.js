import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewGroceryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listName: null,
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: "FETCH_GROCERY" })
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
      <div>
            <Button onClick={this.handleOpen}>Create New List</Button>
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
                    <Button onClick={this.handleCreateNewList} color="primary">
                        Create
          </Button>
                </DialogActions>
            </Dialog>
      </div>
    )
  }
}

export default connect()(NewGroceryList)