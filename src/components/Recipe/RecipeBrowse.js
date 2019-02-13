import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import {connect} from 'react-redux';

class RecipeBrowse extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'FETCH_RECIPES', payload: this.props.recipeSearchValue })
    }

    buildRecipeCards = () => {
        // console.log(this.props.recipeHits);
        return this.props.recipeHits.map((recipe, i) => {
            return <RecipeCard recipe={recipe} key={i} />
        })
    }

  render() {
    return (
      <div>
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

export default connect(mapRStoProps)(RecipeBrowse);
