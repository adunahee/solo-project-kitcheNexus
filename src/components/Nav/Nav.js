import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PageNav from './PageNav';

class Nav extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {

    return (
      <Grid container>
        <Grid
          container
          direction='row'
          justify='space-around'
          alignItems='center'
          spacing={0}
          className='header-div'>

          <Grid item xs={10}>
            <Link to="/home" className="nav-link">
              <Typography variant='h4' className='nav-link'>
                KitcheNexus</Typography>
            </Link>
          </Grid>

          {/* renders either an about link for new users or logout for logged in users */}
          <Grid item xs={2}>
            {this.props.user.id ?
              <LogOutButton className="nav-link" /> :
              <Link className="nav-link" to="/about">
                <Typography align='center' type='h5'>
                  About</Typography>
              </Link>}
          </Grid>

        </Grid>

        {this.props.user.id &&
          <PageNav />
        }
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

//withRouter must wrap connect component thats created 
//otherwise history changes not detected on props and nav does not rerender
export default withRouter(connect(mapStateToProps)(Nav));
