import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipesNav from './RecipesNav';
import RecipeBrowse from './RecipeBrowse';
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
      </div>
    )
  }
}

export default Recipes
