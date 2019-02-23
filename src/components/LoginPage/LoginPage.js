import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';

import { Grid, Button, Typography } from '@material-ui/core';

class LoginPage extends Component {

  render() {
    return (
      <Grid container
        direction='column'
        justify='space-evenly'
        alignItems='center'
        style={{height: '300px'}}>
        <Grid item>
          <Typography variant='h4' align='center'>Login</Typography>
          {this.props.errors.loginMessage && (
            <Typography variant='h5' align='center'
              className="alert"
              role="alert">
              {this.props.errors.loginMessage}</Typography>
          )}
        </Grid>

        <Grid item>
          <LoginForm />
        </Grid>

        <Grid item>
          <Button variant='contained'
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    );
  }
}
// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({errors});
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
