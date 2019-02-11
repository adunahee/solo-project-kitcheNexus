import React, { Component } from 'react'

export default class Pantry extends Component {

buildPantryListItems = () => {

}

  render() {
    return (
      <div>
            <h1>Pantry</h1>
            <p>Filterable lists</p>
            <ul>
                {this.buildPantryListItems()}
            </ul>
      </div>
    )
  }
}
