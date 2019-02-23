import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import {Grid, Paper, Typography} from '@material-ui/core';

import '../Nav/Nav.css';

class RecipesNav extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    getStyle = (linkName) => {
        const location = this.props.location.pathname;
        console.log(linkName);
        console.log(location);
        
        
        const style = { backgroundColor: '#ffe3ae' };
        switch (linkName) {
            case ('browse'):
                if (location === '/recipes/browse') {
                    style.backgroundColor = '#ffc957';
                    style.fontWeight = 'bold';
                } 
                return style;
            case ('favorites'):
                if (location === '/recipes/favorites') {
                    style.backgroundColor = '#ffc957';
                    style.fontWeight = 'bold';
                }
                return style;
            case ('recent'):
                if (location === '/recipes/recent') {
                    style.backgroundColor = '#ffc957';
                    style.fontWeight = 'bold';
                }
                return style;
            default:
                break;
        }
    }

    render() {
        const linkStyle = {
            padding: '14px',
            fontWeight: 'inherit',
            fontSize: 'inherit',
        }

        return (
            <Grid container
                direction='row'
                justify='space-evenly'
                alignItems='center'
                spacing={16}>

                <Grid item>
                    <Paper style={this.getStyle('browse')}>
                        <Link to={`${this.props.match.url}/browse`}
                            className='nav-link'>
                            <Typography align='center' 
                            style={linkStyle}> 
                            Browse</Typography>
                        </Link>
                    </Paper>
                </Grid>

                <Grid item>
                    <Paper style={this.getStyle('favorites')}>
                    <Link to={`${this.props.match.url}/favorites`}
                        className='nav-link'>
                        <Typography align='center' 
                        style={linkStyle}>
                        Favorites</Typography>
                    </Link>
                    </Paper>
                </Grid>

                <Grid item>
                    <Paper style={this.getStyle('recent')}>
                    <Link to={`${this.props.match.url}/recent`}
                        className='nav-link'>
                        <Typography align='center' 
                        style={linkStyle}>
                        Recent</Typography>
                    </Link>
                    </Paper>
                </Grid>

            </Grid>
        )
    }
}

const RecipesNavWithRouter = withRouter(RecipesNav);

export default RecipesNavWithRouter;
