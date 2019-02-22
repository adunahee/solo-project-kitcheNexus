import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import Recipes from '../Recipe/Recipes';
import Pantry from '../Pantry/Pantry';
import Grocery from '../Grocery/Grocery';

import Grid from '@material-ui/core/Grid';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <Grid container
          direction="row"
          justify="center"
          alignItems="flex-start">
          <Grid item
            xs={12}
            sm={10}
            md={8}
            lg={6}>
            <Grid container
              direction='column'
              justify='flex-start'
              alignItems='stretch'
              style={{ height: '100vh' }}
            >
              <Grid item>
                <Nav location={this.props.location} />
              </Grid>

              <Grid item
                style={{
                  height: '75%',
                  overflow: 'auto',
                }}>
                <Switch>

                  <Redirect exact from="/" to="/home" />

                  <Route
                    exact
                    path="/about"
                    component={AboutPage} />

                  <ProtectedRoute
                    exact
                    path="/home"
                    component={UserPage} />

                  <ProtectedRoute
                    path="/pantry"
                    component={Pantry} />

                  <ProtectedRoute
                    path="/recipes"
                    component={Recipes} />

                  <ProtectedRoute
                    path="/grocery"
                    component={Grocery} />

                  <Route render={() => <h1>404</h1>} />

                </Switch>
              </Grid>

              <Grid item>
                <Footer />
              </Grid>

            </Grid>
          </Grid>

        </Grid>

      </Router >
    )
  }
}

export default connect()(App);
