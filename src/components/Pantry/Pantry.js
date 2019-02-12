import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';
import PantryListItem from '../Pantry/PantryListItem';

class Pantry extends Component {

buildPantryListItems = () => {
  return this.props.pantry.map( (foodObj, i) => {
    return <PantryListItem key={i} foodObj={foodObj}/>
  })
}

componentDidMount() {
  this.props.dispatch({type: "FETCH_PANTRY"})
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

const mapRStoProps = (rs) => {
  return {pantry: rs.food.pantry}
}

export default connect(mapRStoProps)(Pantry);
