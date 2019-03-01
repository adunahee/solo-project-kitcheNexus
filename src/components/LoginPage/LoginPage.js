import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';

import { Grid, Typography } from '@material-ui/core';

class LoginPage extends Component {

  render() {
    let formName = 'Register';
    if(this.props.loginMode === 'LOGIN'){
      formName = 'Login';
    }

    return (
      <Grid container
        direction='column'
        justify='flex-start'
        alignItems='center'
        style={{ minHeight: '300px' }}
        spacing={16}>
        <Grid item>
          <Typography variant='h4' align='center'>
          {formName}</Typography>
          {(this.props.errors.loginMessage || this.props.errors.registrationMessage) && (
            <Typography variant='h5' align='center'
              className="alert"
              role="alert">
              {this.props.errors.loginMessage}
              {this.props.errors.registrationMessage}</Typography>
          )}
        </Grid>

        <Grid item>
          <LoginForm />
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
  loginMode: state.loginMode
});

export default connect(mapStateToProps)(LoginPage);
