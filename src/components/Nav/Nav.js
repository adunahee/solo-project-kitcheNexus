import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Nav extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    console.log(this.props);
    
    return (
      <Grid container>
        <Grid
          container
          direction='row'
          justify='space-evenly'
          alignItems='flex-start'
          spacing={0}>
          <Link to="/home" className="nav-link">
            <Typography variant='h3' className='nav-link'>
              KitcheNexus
          </Typography>
          </Link>
          {this.props.user.id ?

            <LogOutButton className="nav-link" /> :
            <Typography align='center' type='h5'>
              <Link className="nav-link" to="/about">
                About</Link>
            </Typography>}
          {/* renders either an about link for new users or logout for logged in users */}
        </Grid>

        {this.props.user.id &&
          <Grid
            container
            direction='row'
            justify='space-evenly'
            alignItems='flex-start'
            spacing={16}>
            <Grid item
              xs={4}>
              <Typography align='center' type='h4'>
                <Link className="nav-link"
                  to="/pantry">
                  Pantry</Link>
              </Typography>
            </Grid>
            <Grid item
              xs={4}>
              <Typography align='center' type='h4'>
                <Link className="nav-link"
                  to="/recipes/browse">
                  Recipes</Link>
              </Typography>
            </Grid>
            <Grid item
              xs={4}>
              <Typography align='center' type='h4'>
                <Link className="nav-link"
                  to="/grocery">
                  Grocery</Link>
              </Typography>
            </Grid>
          </Grid >
        }
      </Grid>
    )
  }
}

const NavWithRouter = withRouter(Nav)

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavWithRouter);
