import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeCardList from './RecipeCardList';

import { Grid, Typography } from '@material-ui/core';

class RecipeRecent extends Component {
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_RECENT_RECIPES' });
    }
    render() {
        return (
            <Grid container
                direction='column'
                justify="flex-start"
                alignItems="center"
                spacing={16}>
                <Grid item>
                    <Typography align='center'>Recent recipes are up to the last 5 recipes you have viewed in the past week!  Use this tab to favorite recipes you have tried and liked!</Typography>
                </Grid>
                <Grid item>
                    {this.props.recentRecipes.length > 0 &&
                        <RecipeCardList recipes={this.props.recentRecipes} />}
                </Grid>

            </Grid>
        )
    }
}

const mapRStoProps = (rs) => {
    return { recentRecipes: rs.food.recentRecipes }
}

export default connect(mapRStoProps)(RecipeRecent);