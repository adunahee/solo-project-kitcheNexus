import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Card, CardHeader, CardContent, CardActions,
    Collapse, IconButton, Typography, List, ListItem
}
    from '@material-ui/core';

import { Favorite, FavoriteBorder, ExpandMore, OpenInNew } from '@material-ui/icons';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        }
    }

    checkFavoriteStatus = () => {
        const FavoriteCheck = this.props.favorites.find(
            (recipe) => { return recipe.uri === this.props.recipe.uri })
        if (FavoriteCheck === undefined) {
            return <FavoriteBorder />
        } else {
            return <Favorite style={{ color: 'rgb(255, 201, 87)' }} />
        }
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    handleLink = () => {
        this.props.dispatch({ type: 'ADD_RECENT_RECIPE', payload: this.props.recipe.uri })
    }

    handleFavorite = () => {
        this.props.dispatch({ type: 'ADD_FAVORITE', payload: this.props.recipe.uri })
    }

    render() {
        let imageLink = '/images/image_not_found_300x300.png';

        return (
            <Card style={{ maxWidth: '300px' }}>
                <CardHeader
                    title={this.props.recipe.label}
                    subheader={`Cook Time ${this.props.recipe.totalTime > 0 ? `: ~${this.props.recipe.totalTime} min` : `Unlisted`}`} />
                {/* replaces CardMedia because needed to source alternative img if edamam API unresponsive */}
                <div style={{
                    backgroundImage: `url(${this.props.recipe.image}), url(${imageLink})`,
                    display: 'block',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '300px',
                    width: '300px'
                }}>
                </div>
                <CardActions>
                    <IconButton
                        onClick={this.handleFavorite}
                        aria-label="Add to favorites">
                        {this.checkFavoriteStatus()}
                    </IconButton>
                    <a href={this.props.recipe.url}
                        target='_blank'
                        rel="noopener noreferrer"
                        onClick={this.handleLink}>
                        <IconButton
                            aria-label="Link to Directions">
                            <Typography>
                                Directions
                        </Typography>
                            <OpenInNew />
                        </IconButton>
                    </a>

                    <IconButton
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show Ingredients"
                    >
                        <Typography>
                            Ingredients
                        </Typography>
                        <ExpandMore
                            style={this.state.expanded ? { transform: 'rotate(180deg)' } : {}} />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <List>
                            {this.props.recipe.ingredientLines.map((ingredient, i) => {
                                return <ListItem key={i}>{ingredient}</ListItem>
                            })}
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

const mapRStoProps = (rs) => {
    return { favorites: rs.food.recipeFavorites }
}

export default connect(mapRStoProps)(RecipeCard)
