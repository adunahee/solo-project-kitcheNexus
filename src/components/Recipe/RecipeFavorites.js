import React, { Component } from 'react'
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';

class RecipeFavorites extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_FAVORITES'});
    }

    buildFavoritesCards = () => {
        return this.props.favorites.map((recipe, i) => {
            return <RecipeCard recipe={recipe} key={i} />
        })
    }

  render() {
    return (
      <Grid container>
      {this.props.favorites.length > 0 ? 
            this.buildFavoritesCards()
            :
        <Typography>
          You have no favorites at this time.  
          Click <FavoriteIcon /> Icon on recipes you want to easily access later!
          </Typography>}
      </Grid>   
    )
  }
}

const mapRStoProps = (rs) => {
    return {favorites: rs.food.recipeFavorites}
}

export default connect(mapRStoProps)(RecipeFavorites)