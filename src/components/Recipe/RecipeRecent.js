import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';

class RecipeRecent extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_RECENT_RECIPES'});
    }

    buildRecent = () => {
        // console.log(this.props.recipeHits);
        return this.props.recentRecipes.map((recipe, i) => {
            return <RecipeCard recipe={recipe} key={i} />
        })
    }

    render() {
        return (
            <div>
                <h2>Recent Recipes</h2>
                {this.props.recentRecipes.length > 0 &&
                    this.buildRecent()}
            </div>
        )
    }
}

const mapRStoProps = (rs) => {
    return {recentRecipes: rs.food.recentRecipes}
}

export default connect(mapRStoProps)(RecipeRecent);