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
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

class PageNavDrawer extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }

    //conditionally styles nav links based on nav link type and history location
    getLinkStyle = (linkName) => {
        console.log(linkName);
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
            <div style={{ width: '200px' }}>
                <Grid container
                    direction='column'
                    justify="space-between"
                    spacing={24}>
                    <Grid item>
                        <List>

                            <ListItem button
                                style={this.getLinkStyle('pantry')}>
                                <Link className="nav-link"
                                    to="/pantry">
                                    <Typography align='center'
                                        style={this.linkStyle}>
                                        Pantry</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button
                                style={this.getLinkStyle('recipe')}>
                                <Link className="nav-link"
                                    to="/recipes/browse">
                                    <Typography align='center'
                                        style={this.linkStyle}>
                                        Recipes</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button
                                style={this.getLinkStyle('grocery')}>
                                <Link className="nav-link"
                                    to="/grocery">
                                    <Typography align='center'
                                        style={this.linkStyle}>
                                        Grocery</Typography>
                                </Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item>
                        <Footer />
                    </Grid>



                </Grid>

            </div>
        )
    }
}

const PageNavDrawerWithRouter = withRouter(PageNavDrawer);

export default PageNavDrawerWithRouter;