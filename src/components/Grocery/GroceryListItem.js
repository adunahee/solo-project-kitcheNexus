import React, { Component } from 'react'
import { connect } from 'react-redux';

class GroceryListItem extends Component {

  render() {
    return (
      <li>
          {this.props.groceryItem.name}
      </li>
    )
  }
}

export default connect()(GroceryListItem)
