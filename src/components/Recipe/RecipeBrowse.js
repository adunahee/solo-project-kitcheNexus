import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeCardList from './RecipeCardList';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';

import { Grid, IconButton } from '@material-ui/core';
import { Search, Clear, Delete, Cake } from '@material-ui/icons';

class RecipeBrowse extends Component {

    handleSubmit = () => {
        this.props.dispatch({ type: 'FETCH_RECIPES', payload: this.props.recipeSearchValue })
    }

    handleClear = () => {
        this.props.dispatch({ type: 'CLEAR_SEARCH_VALUE' });
    }

    handleClearAll = () => {
        this.props.dispatch({ type: "CLEAR_RECIPE_HITS" });
        this.props.dispatch({ type: 'CLEAR_SEARCH_VALUE' });
    }

    render() {
        return (
            <Grid container
                direction='column'
                justify="flex-start"
                alignItems="center"
                spacing={16}>

                <Grid item>
                    <Grid container
                        direction='row'
                        justify="center"
                        alignItems="center"
                        spacing={8}>

                        <Grid item>
                            <FoodSearchBar pageView='RECIPE' />
                        </Grid>

                        <Grid item>
                            <IconButton onClick={this.handleSubmit}
                                style={{ backgroundColor: '#ffe3ae' }}>
                                <Search /> </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={this.handleClear}
                                style={{ backgroundColor: '#ffe3ae' }}>
                                <Clear /> </IconButton>
                        </Grid>

                        <Grid item>
                            {this.props.recipeHits.length > 0 ?
                                <IconButton onClick={this.handleClearAll}
                                    color='secondary'
                                    style={{ backgroundColor: '#ffc957' }}>
                                    <Delete /> </IconButton> :
                                <IconButton style={{ visibility: 'hidden' }}>
                                    <Cake />
                                </IconButton>}
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item>
                    {this.props.recipeHits.length > 0 &&
                        <RecipeCardList recipes={this.props.recipeHits}/>}
                </Grid>

            </Grid>
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
