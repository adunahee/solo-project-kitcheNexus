import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';

class Recipes extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'FETCH_RECIPES', payload: this.props.recipeSearchValue })
  }

  buildRecipeCards = () => {
    // console.log(this.props.recipeHits);
    return this.props.recipeHits.map( (recipe, i) => {
      return <RecipeCard recipe={recipe} key={i} />
    })
  }

  render() {
    // console.log(this.props);
    
    return (
      <div>
        <h1>Recipes</h1>
        <p>search bar, cards, and browse/favorites tabs</p>
        <form onSubmit={this.handleSubmit}>
          <FoodSearchBar pantryView='RECIPE' />
          <button type='submit'>Find Recipes</button>
        </form>
        {this.props.recipeHits.length > 0 &&
          this.buildRecipeCards()
        }
      </div>
    )
  }
}

const mapRStoProps = (rs) => {
  return {
    recipeSearchValue: rs.food.recipeSearchValue,
    recipeHits: rs.food.recipeHits,
  }
}

export default connect(mapRStoProps)(Recipes)
