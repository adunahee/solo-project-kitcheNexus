import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';
import PantryListItem from '../Pantry/PantryListItem';

class Pantry extends Component {

  buildPantryListItems = () => {
    return this.props.pantry.map((foodObj, i) => {
      return <PantryListItem key={i} foodObj={foodObj} />
    })
  }

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_PANTRY" })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_FOOD_TO_PANTRY', payload: this.props.pendingPantryItems })
  }

  render() {
    return (
      <div>
        <h1>Pantry</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Find Foods</p>
          <FoodSearchBar pageView='PANTRY' />
          {this.props.pendingPantryItems.length > 0 &&
          <div>
            <h2>Items to Add</h2>
            <ul>
              {this.props.pendingPantryItems.map((item, i) => {
                return <li key={i}> {item} </li>
              })}
            </ul>
          </div>}
              <br />
          <button type='submit'>Finalize Pantry</button>
        </form>
        <p>Filterable lists</p>
        <ul>
          {this.buildPantryListItems()}
        </ul>
      </div>
    )
  }
}

const mapRStoProps = (rs) => {
  return {
    pantry: rs.food.pantry,
    pendingPantryItems: rs.food.pendingPantryItems
  }
}

export default connect(mapRStoProps)(Pantry);
