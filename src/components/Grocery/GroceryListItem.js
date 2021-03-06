import React, { Component } from 'react'
import { connect } from 'react-redux';

import {ListItem} from '@material-ui/core';

class GroceryListItem extends Component {

  handleClick = () => {
    const remove = window.confirm('Remove from list?');
    if (remove) {
      const purchased = window.confirm('Add to pantry?');
      if (purchased) {
        this.props.dispatch({
          type: 'ADD_FOOD_TO_PANTRY',
          payload: [this.props.groceryItem.name],
        })
      }
      this.props.dispatch({
        type: 'DELETE_GROCERY_ITEM',
        payload: this.props.groceryItem,
      })
    } else {
      alert('Item kept on list.');
    }
  }

  render() {
    return (
      <ListItem onClick={this.handleClick}>
        {this.props.groceryItem.name}
      </ListItem>
    )
  }
}

export default connect()(GroceryListItem)
