import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';
import PantryTable from './PantryTable';

class Pantry extends Component {

  

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
        <PantryTable />
      </div>
    )
  }
}

const mapRStoProps = (rs) => {
  return {
    pendingPantryItems: rs.food.pendingPantryItems
  }
}

export default connect(mapRStoProps)(Pantry);
