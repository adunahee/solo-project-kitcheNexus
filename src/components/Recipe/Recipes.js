import React, { Component } from 'react';
import RecipesNav from './RecipesNav';
import RecipeBrowse from './RecipeBrowse';
import RecipeRecent from './RecipeRecent';
import {Route} from 'react-router-dom';

class Recipes extends Component {

  render() {
    // console.log(this.props);

    return (
      <div>
        <RecipesNav />
        <h1>Recipes</h1>
        <p>search bar, cards, and browse/favorites tabs</p>
        <Route exact path='/recipes/browse'
          component={RecipeBrowse}
        />
        <Route exact path='/recipes/recent'
        component={RecipeRecent}
        />
      </div>
    )
  }
}

export default Recipes
