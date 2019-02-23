import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeCardList from './RecipeCardList';

import {Grid} from '@material-ui/core';

class RecipeRecent extends Component {
    render() {
        return (
            <Grid container
                direction='row'
                spacing={16}
                justify="center"
                alignItems="baseline">
                {this.props.recentRecipes.length > 0 &&
                <RecipeCardList recipes={this.props.recentRecipes} /> }
            </Grid>
        )
    }
}

const mapRStoProps = (rs) => {
    return {recentRecipes: rs.food.recentRecipes}
}

export default connect(mapRStoProps)(RecipeRecent);