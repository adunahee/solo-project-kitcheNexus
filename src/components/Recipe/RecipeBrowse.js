import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import './Recipe.css';

import Grid from '@material-ui/core/Grid';

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
                spacing={16}>
                { this.props.recipeHits.map((recipe, i) => {return <RecipeCard recipe={recipe} key={i} />})}
            </Grid>
            )
    }

    handleClear = () => {
        this.props.dispatch({type: "CLEAR_RECIPE_HITS"});
        this.props.dispatch({type: 'CLEAR_SEARCH_VALUE'});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FoodSearchBar pageView='RECIPE' />
                    <Button type='submit' color='primary'>Find Recipes</Button>
                    <Button onClick={this.handleClear} color='secondary'> Clear Results </Button>
                </form>

                {this.props.recipeHits.length > 0 &&
                    this.buildRecipeCards()
                }
            </div>
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
