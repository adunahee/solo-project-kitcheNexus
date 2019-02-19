import React, { Component } from 'react';
import RecipesNav from './RecipesNav';
import RecipeBrowse from './RecipeBrowse';
import RecipeRecent from './RecipeRecent';
import RecipeFavorites from './RecipeFavorites';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {Route} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

class Recipes extends Component {

  render() {
    // console.log(this.props);

    return (
      <Grid container
      direction='column'>
        <RecipesNav />
        <Route exact path='/recipes/browse'
          component={RecipeBrowse}
        />
        <Route exact path='/recipes/recent'
        component={RecipeRecent}
        />
        <Route exact path='/recipes/favorites'
        component={RecipeFavorites}/>
      </Grid>
    )
  }
}

export default Recipes
