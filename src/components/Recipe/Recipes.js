import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import RecipesNav from './RecipesNav';
import RecipeBrowse from './RecipeBrowse';
import RecipeRecent from './RecipeRecent';
import RecipeFavorites from './RecipeFavorites';

import {Grid, Typography, Paper} from '@material-ui/core';

class Recipes extends Component {
  componentDidMount(){
    this.props.dispatch({type: 'FETCH_FAVORITES'});
    this.props.dispatch({ type: 'FETCH_RECENT_RECIPES' });
    this.props.dispatch({type: 'FETCH_RECENT_RECIPES'});
  }

  render() {
    // console.log(this.props);

    return (
      <Grid container
        direction='column'
        spacing={24}
        style={{
          minHeight: '85vh'
        }}>
        <Grid item>
          <Paper style={{ backgroundColor: '#ffc957', minHeight: '56px' }}>
            <Typography variant='h4' align='center' style={{padding: '8px'}}>Recipes</Typography>
          </Paper>
        </Grid>

        <Grid item>
          <RecipesNav />
        </Grid>

        <Grid item>
          <Route exact path='/recipes/browse'
            component={RecipeBrowse}
          />
          <Route exact path='/recipes/recent'
            component={RecipeRecent}
          />
          <Route exact path='/recipes/favorites'
            component={RecipeFavorites} />
        </Grid>

      </Grid>
    )
  }
}

export default connect()(Recipes)
