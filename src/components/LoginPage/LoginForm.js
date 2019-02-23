import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Button } from '@material-ui/core';

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
        return (
            <div>
                <form className='login-form' onSubmit={this.login}>
                    <Grid container
                        direction='row'
                        justify='space-evenly'
                        alignItems='baseline'>

                        <Grid item>
                            <label htmlFor="username">
                                Username:
                                <input type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleInputChangeFor('username')} />
                            </label>
                        </Grid>

                        <Grid item>
                            <label htmlFor="password">
                                Password:
                                <input type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChangeFor('password')} />
                            </label>
                        </Grid>

                        <Grid item>
                            <Button
                                variant='contained'
                                type='submit'
                                value='Log In'
                                name='submit'
                                style={{ backgroundColor: '#aedd94'}}>
                                Log In</Button>
                        </Grid>

                    </Grid>
                </form>
            </div>


        )
    }
}

export default connect()(LoginForm);