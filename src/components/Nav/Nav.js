import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Nav = (props) => (
  <Grid container>
    <Grid
      container
      direction='row'
      justify='space-evenly'
      alignItems='flex-start'
      spacing={16}>
      <Grid item
        xs={8}
        md={6}>
        <Link to="/home" className="nav-link">
          <Typography variant='h4' className='nav-link'>
            KitcheNexus
          </Typography>
        </Link>
      </Grid>
      {/* renders either an about link for new users or logout for logged in users */}
      {props.user.id ?
        <Grid item
          xs={2}
          md={3}>
          <LogOutButton className="nav-link" />
        </Grid> :
        <Grid item
          xs={2}
          md={3}>
          <Typography align='center' type='h5'>
            <Link className="nav-link" to="/about">
              About</Link>
          </Typography>
        </Grid>}
    </Grid>
    {props.user.id &&
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='flex-start'
        spacing={16}>
        <Grid item
          xs={4}>
          <Typography align='center' type='h5'>
            <Link className="nav-link"
              to="/pantry">
              Pantry</Link>
          </Typography>
        </Grid>
        <Grid item
          xs={4}>
          <Typography align='center' type='h5'>
            <Link className="nav-link"
              to="/recipes/browse">
              Recipes</Link>
          </Typography>
        </Grid>
        <Grid item
          xs={4}>
          <Typography align='center' type='h5'>
            <Link className="nav-link"
              to="/grocery">
              Grocery</Link>
          </Typography>
        </Grid>
      </Grid >
    }
  </Grid>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
