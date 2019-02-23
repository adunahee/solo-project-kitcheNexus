import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import PageNavDrawer from './PageNavDrawer';
import LogOutButton from '../LogOutButton/LogOutButton';


import { Grid, Typography, AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { Menu, Info } from '@material-ui/icons';

import './Nav.css';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: false,
    }
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  toggleNav = () => {
    this.setState({ nav: !this.state.nav })
  }

  render() {

    return (
      <Grid>

        <AppBar position="static"
          style={{ backgroundColor: '#aedd94' }}>
          <Toolbar>
            <IconButton aria-label="Menu" onClick={this.toggleNav}>
              <Menu style={{color: 'black'}}/>
            </IconButton>
            <Drawer open={this.state.nav} onClose={this.toggleNav}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleNav}
                onKeyDown={this.toggleNav}>
                <PageNavDrawer />
              </div>
            </Drawer>
            <Link to="/home" className="nav-link">
              <Typography variant='h3' className='nav-link'>
                KitcheNexus</Typography>
            </Link>
            {this.props.user.id ?
              <LogOutButton className="nav-link" /> :

              <IconButton>
                <Link className="nav-link" to="/about">
                  <Info />
                </Link>
              </IconButton>
            }
          </Toolbar>
        </AppBar>

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
