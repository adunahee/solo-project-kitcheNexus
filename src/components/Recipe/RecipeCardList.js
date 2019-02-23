import React, { Component } from 'react';
import RecipeCard from './RecipeCard';

import { Grid } from '@material-ui/core'


class RecipeCardList extends Component {
    render() {
        return (
            <Grid container
                direction='row'
                spacing={16}
                justify="center"
                alignItems="baseline">

                {this.props.recipes.map((recipe, i) => {
                    return (
                        <Grid item key={i}>
                            <RecipeCard recipe={recipe} key={i} />
                        </Grid>
                    )
                })}

            </Grid>
        )
    }
}

export default RecipeCardList;