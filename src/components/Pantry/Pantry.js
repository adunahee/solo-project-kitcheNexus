import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';

export default class Pantry extends Component {

buildPantryListItems = () => {

}

  render() {
    return (
      <div>
            <h1>Pantry</h1>
            <p>Find Foods</p>
            <FoodSearchBar />
            <p>Filterable lists</p>
            <ul>
                {this.buildPantryListItems()}
            </ul>
      </div>
    )
  }
}
