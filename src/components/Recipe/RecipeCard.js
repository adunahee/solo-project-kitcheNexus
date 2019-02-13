import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './Recipe.css';

export default class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        }
    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader 
                        title={this.props.recipe.label}
                        subheader={`Cook Time: ${this.props.recipe.totalTime}`}/>
                    <CardMedia 
                        image={this.props.recipe.image}
                        className='recipe-image'/>
                    <CardActions>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show Ingredients"
                        >
                        <Typography>
                            Ingredients
                        </Typography>
                            <ExpandMoreIcon 
                                className={ this.state.expanded ? 'expand-open' :''}/>
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
            </div>
        )
    }
}
