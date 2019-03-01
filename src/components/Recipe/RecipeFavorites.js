import React, { Component } from 'react'
import { connect } from 'react-redux';

import RecipeCardList from './RecipeCardList';

import { FavoriteBorder } from '@material-ui/icons';
import { Grid, Typography } from '@material-ui/core';



class RecipeFavorites extends Component {
  componentDidMount(){
    this.props.dispatch({ type: 'FETCH_FAVORITES' });
  }
  render() {
    return (
      <Grid container
        direction='column'
        justify="flex-start"
        alignItems="center"
        spacing={16}>

        <Grid item>
          {this.props.favorites.length > 0 ?
            <Typography> You have
              {this.props.favorites.length === 1 ? ' one recipe ' :
                ` ${this.props.favorites.length} recipes `}
              favorited so far.  Keep building your collection!
            </Typography>
            :
            <Typography>
              You have no favorites at this time.
              Click <FavoriteBorder /> Icon on recipes
              you want to easily access later!
            </Typography>}
        </Grid>

        <Grid item>
          {this.props.favorites.length > 0 &&
            <RecipeCardList recipes={this.props.favorites} />}
        </Grid>

      </Grid>
    )
  }
}

const mapRStoProps = (rs) => {
  return { favorites: rs.food.recipeFavorites }
}

export default connect(mapRStoProps)(RecipeFavorites)