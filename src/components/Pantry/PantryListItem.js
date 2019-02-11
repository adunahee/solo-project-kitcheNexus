import React, { Component } from 'react'

export default class PantryListItem extends Component {
  render() {
    return (
      <li>
        {this.props.foodObj.food_name}
      </li>
    )
  }
}
