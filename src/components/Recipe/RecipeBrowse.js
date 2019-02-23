import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';

import { Grid, IconButton } from '@material-ui/core';
import { Search, Clear, Delete, Cake } from '@material-ui/icons';

class RecipeBrowse extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'FETCH_RECIPES', payload: this.props.recipeSearchValue })
    }

    buildRecipeCards = () => {
        // console.log(this.props.recipeHits);
        return (
            <Grid container
                className='recipe-book'
                direction='row'
                spacing={16}
                justify="center"
                alignItems="baseline"
            >
                {this.props.recipeHits.map((recipe, i) => {
                    return (
                        <Grid item> 
                            <RecipeCard recipe={recipe} key={i} />
                        </Grid>
                    )
                })}
            </Grid>
        )
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
                        this.buildRecipeCards()
                    }
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
