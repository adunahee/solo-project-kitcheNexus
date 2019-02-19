import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import '../Nav/Nav.css';


class RecipesNav extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    browseClass = () => {
        const location = this.props.location.pathname;
        console.log(location);
        switch (location) {
            case ('/recipes/browse'):
                return 'recipes-view-true';
            default:
                return 'recipes-view-false';
        }
    }

    favoritesClass = () => {
        const location = this.props.location.pathname;
        console.log(location);
        switch (location) {
            case ('/recipes/favorites'):
                return 'recipes-view-true';
            default:
                return 'recipes-view-false';
        }
    }

    recentClass = () => {
        const location = this.props.location.pathname;
        console.log(location);
        switch (location) {
            case ('/recipes/recent'):
                return 'recipes-view-true'
            default:
                return 'recipes-view-false';
        }
    }

    render() {
        return (
            <Grid container
                direction='row'
                justify='space-evenly'
                alignItems='flex-start'
                spacing={0}>

                <Grid item
                    xs={4}
                    className={`recipe-nav-div ${this.browseClass()}`}>
                    <Link to={`${this.props.match.url}/browse`}
                        className='nav-link'>
                        <Typography align='center' type='h5' className={this.browseClass()}> Browse</Typography>
                    </Link>
                </Grid>

                <Grid item
                    xs={4}
                    className={`recipe-nav-div ${this.favoritesClass()}`}>
                    <Link to={`${this.props.match.url}/favorites`}
                        className='nav-link'>
                        <Typography align='center' type='h5' className={this.favoritesClass()}>Favorites</Typography>
                    </Link>
                </Grid>

                <Grid item
                    xs={4}
                    className={`recipe-nav-div ${this.recentClass()}`}>
                    <Link to={`${this.props.match.url}/recent`}
                        className='nav-link'>
                        <Typography align='center' type='h5' className={this.recentClass()}>Recent</Typography>
                    </Link>
                </Grid>

            </Grid>
        )
    }
}

const RecipesNavWithRouter = withRouter(RecipesNav);

export default RecipesNavWithRouter;
