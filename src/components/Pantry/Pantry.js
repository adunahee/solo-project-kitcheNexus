import React, { Component } from 'react';
import FoodFormPopup from '../FoodSearchBar/FoodFormPopup';
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
        <FoodFormPopup pageView='PANTRY'/>
        <PantryTable />
      </div>
    )
  }
}

const mapRStoProps = (rs) => {
  return {
    pendingPantryItems: rs.pantry.pendingPantryItems
  }
}

export default connect(mapRStoProps)(Pantry);
