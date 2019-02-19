import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    pantry: {

    },
    recipes: {

    }, 
    grocery: {

    }
}

class PageNav extends React.Component {
    pantryClass = () => {
        const location = this.props.location.pathname;
        switch (location) {
            case ('/pantry'):
                return 'pantry-view-true'
            default:
                return 'pantry-view-false';
        }
    }

    recipesClass = () => {
        const location = this.props.location.pathname;
        switch (location) {
            case ('/recipes'):
                return 'recipes-view-true'
            default:
                return 'recipes-view-false';
        }
    }

    groceryClass = () => {
        const location = this.props.location.pathname;
        switch (location) {
            case ('/grocery'):
                return 'grocery-view-true'
            default:
                return 'grocery-view-false';
        }
    }
  render() {
    return (
        <Grid
            container
            direction='row'
            justify='space-evenly'
            alignItems='flex-start'
            spacing={0}>

            <Grid item
                xs={4}>
                <Link className="nav-link"
                    to="/pantry">
                    <Typography align='center' type='h4' className={this.pantryClass()}>
                        Pantry</Typography>
                </Link>
            </Grid>

            <Grid item
                xs={4}>
                <Link className="nav-link"
                    to="/recipes/browse">
                    <Typography align='center' type='h4' className={this.recipesClass()}>
                        Recipes</Typography>
                </Link>
            </Grid>

            <Grid item
                xs={4}>
                <Link className="nav-link"
                    to="/grocery">
                    <Typography align='center' type='h4' className={this.groceryClass()}>
                        Grocery</Typography>
                </Link>
            </Grid>

        </Grid >
    )
  }
}

const PageNavWithRouter = withRouter(PageNav);

export default withStyles(styles)(PageNavWithRouter);