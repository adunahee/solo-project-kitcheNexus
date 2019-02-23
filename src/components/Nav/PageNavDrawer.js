import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Footer from './Footer';

import './Nav.css';

import {
    Typography,
    List,
    ListItem,
    Grid,
    Paper,
} from '@material-ui/core';

class PageNavDrawer extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }

    //conditionally styles nav links based on nav link type and history location
    getLinkStyle = (linkName) => {
        const location = this.props.location.pathname;

        const style = {};
        switch (linkName) {
            case ('pantry'):
                if (location === '/pantry') {
                    style.backgroundColor = '#ff5d55';
                    style.fontWeight = 'bold';
                } else {
                    style.backgroundColor = '#ffb4b0'
                }
                return style;
            case ('recipe'):
                if (location.indexOf('recipe') > -1) {
                    style.backgroundColor = '#ffc957';
                    style.fontWeight = 'bold';
                } else {
                    style.backgroundColor = '#ffe3ae'
                }
                return style;
            case ('grocery'):
                if (location === '/grocery') {
                    style.backgroundColor = '#3d8af7';
                    style.fontWeight = 'bold';
                } else {
                    style.backgroundColor = '#a8c6fa';
                }
                return style;
            default:
                break;
        }
    }

    linkStyle = {
        padding: '14px',
        fontWeight: 'inherit',
        fontSize: 'inherit',
    }

    render() {
        return (
            <Grid container
                direction='column'
                justify="space-between"
                spacing={24}
                style={{ minWidth: '250px',
                        minHeight: '85vh' }}>
                <Grid item>
                    <List>

                        <ListItem>
                            <Paper style={this.getLinkStyle('pantry')}>
                                <Link className="nav-link"
                                    to="/pantry">
                                    <Typography align='center'
                                        style={this.linkStyle}>
                                        Pantry</Typography>
                                </Link>
                            </Paper>
                        </ListItem>

                        <ListItem>
                            <Paper style={this.getLinkStyle('recipe')}>
                                <Link className="nav-link"
                                    to="/recipes/browse">
                                    <Typography align='center'
                                        style={this.linkStyle}>
                                        Recipes</Typography>
                                </Link>
                            </Paper>
                        </ListItem>

                        <ListItem>
                            <Paper style={this.getLinkStyle('grocery')}>
                                <Link className="nav-link"
                                    to="/grocery">
                                    <Typography align='center'
                                        style={this.linkStyle}>
                                        Grocery</Typography>
                                </Link>
                            </Paper>
                        </ListItem>

                    </List>
                </Grid>
                <Grid item>
                    <Footer />
                </Grid>



            </Grid>
        )
    }
}

const PageNavDrawerWithRouter = withRouter(PageNavDrawer);

export default PageNavDrawerWithRouter;