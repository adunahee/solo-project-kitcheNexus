import React from 'react';
import { connect } from 'react-redux';

import { Grid, Typography } from '@material-ui/core';
import { Menu, ExitToApp } from '@material-ui/icons';

class UserPage extends React.Component {

  render() {

    return (
      <Grid container
        direction='column'
        spacing={24}
        style={{ minHeight: '300px' }}>

        <Grid item>
          <Typography variant='h4' align='center' id="welcome">
            Welcome, {this.props.user.username}!</Typography>
        </Grid>

        <Grid item>
          <Typography align='center' >Use the <Menu /> to explore the app.  You can log out any time using <ExitToApp /> in the upper right.</Typography>
        </Grid>

        <Grid item>
          <Typography align='center' >Stay tuned for upcoming features, like the ability to join a household, and food 'age' alerts.</Typography>
        </Grid>

      </Grid>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
