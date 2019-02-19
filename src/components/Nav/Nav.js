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
          justify='space-evenly'
          alignItems='flex-start'
          spacing={0}
          className='header-div'>
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
