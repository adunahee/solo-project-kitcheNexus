import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './Nav.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
        if(location.indexOf( 'recipe') > -1 ){
            return 'recipes-view-true';
        } else {
            return 'recipes-view-false';
        }
    }

    groceryClass = () => {
        const location = this.props.location.pathname;
        switch (location) {
            case ('/grocery'):
                return 'grocery-view-true';
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
            spacing={0}
            >

            <Grid item
                xs={4}
                className={`page-nav-div ${this.pantryClass()}`}>
                <Link className="nav-link"
                    to="/pantry">
                    <Typography align='center' type='h4' className={this.pantryClass()}>
                        Pantry</Typography>
                </Link>
            </Grid>

            <Grid item
                xs={4}
                className={`page-nav-div ${this.recipesClass()}`}>
                <Link className="nav-link"
                    to="/recipes/browse">
                    <Typography align='center' type='h4' className={this.recipesClass()}>
                        Recipes</Typography>
                </Link>
            </Grid>

            <Grid item
                xs={4}
                className={`page-nav-div ${this.groceryClass()}`}>
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

export default PageNavWithRouter;