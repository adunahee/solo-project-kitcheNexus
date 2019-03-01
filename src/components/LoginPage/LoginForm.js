import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Button, TextField } from '@material-ui/core';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
    };

    submitUser = (event) => {
        event.preventDefault();
        if (this.props.mode === 'LOGIN') {
            if (this.state.username && this.state.password) {
                this.props.dispatch({
                    type: this.props.mode,
                    payload: {
                        username: this.state.username,
                        password: this.state.password,
                    },
                });
            } else {
                this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
            }
        }
        else if (this.props.mode === 'REGISTER') {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    }

    handleRegister = () => {
        if (this.props.mode === 'REGISTER' && (this.state.username === '' || this.state.password === '')) {
            return this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
        this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' })
        this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' })
    }

    handleLoginReturn = () => {
        this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' })
        this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' })
        this.props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR' })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <form className='login-form' onSubmit={this.submitUser}>
                    <Grid container
                        direction='column'
                        justify='space-evenly'
                        alignItems='center'
                        spacing={16}>
                        <Grid item>
                            <Grid container
                                direction='row'
                                justify='space-evenly'
                                spacing={8}>
                                <Grid item>
                                    <TextField
                                        label="Username"
                                        value={this.state.username}
                                        onChange={this.handleInputChangeFor('username')}
                                        margin="dense"
                                        variant="filled"
                                    />
                                </Grid>

                                <Grid item>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        margin="dense"
                                        variant="filled"
                                        value={this.state.password}
                                        onChange={this.handleInputChangeFor('password')}
                                    />
                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid item>
                            <Grid container
                                direction='row'
                                justify='space-evenly'
                                spacing={8}>
                                {this.props.mode === 'LOGIN' ?
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            type='submit'
                                            style={{ backgroundColor: '#aedd94' }}>
                                            Login</Button>
                                    </Grid>
                                    :
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            onClick={this.handleLoginReturn}
                                            style={{ backgroundColor: '#aedd94' }}>
                                            Return to Login</Button>
                                    </Grid>
                                }


                                <Grid item>
                                    <Button variant='contained'
                                        type='submit'
                                        onClick={this.handleRegister}>
                                        Register</Button>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </form>
            </div>

        )
    }
}

const mapRStoProps = (rs) => {
    return { mode: rs.loginMode }
}

export default connect(mapRStoProps)(LoginForm);