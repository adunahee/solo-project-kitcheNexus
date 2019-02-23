import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Button, TextField } from '@material-ui/core';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
    };

    login = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    } // end login

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        const inputStyle = { margin: "5px" };

        return (
            <div>
                <form className='login-form' onSubmit={this.login}>
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
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        value='Log In'
                                        name='submit'
                                        style={{ backgroundColor: '#aedd94' }}>
                                        Log In</Button>
                                </Grid>

                                <Grid item>
                                    <Button variant='contained'
                                        onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
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

export default connect()(LoginForm);