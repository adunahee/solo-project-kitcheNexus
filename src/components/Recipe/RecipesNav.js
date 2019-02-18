import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class RecipesNav extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    render() {
        // console.log(this.props);

        return (
            <Grid container
                direction='row'
                justify='space-evenly'
                alignItems='flex-start'
                spacing={16}>
                <Grid item
                    xs={4}>
                    <Typography align='center' type='h5'>
                        <Link to={`${this.props.match.url}/browse`}
                            className='nav-link'>Browse</Link>
                    </Typography>
                </Grid>
                <Grid item
                    xs={4}>
                    <Typography align='center' type='h5'>
                        <Link to={`${this.props.match.url}/favorites`}
                            className='nav-link'>Favorites</Link>
                    </Typography>
                </Grid>
                <Grid item
                    xs={4}>
                    <Typography align='center' type='h5'>
                        <Link to={`${this.props.match.url}/recent`}
                            className='nav-link'>Recent</Link>
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

const RecipesNavWithRouter = withRouter(RecipesNav);

export default RecipesNavWithRouter;
