import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroceryLists from './GroceryLists';
import NewGroceryList from './NewGroceryList';

import { Grid, Paper, Typography } from '@material-ui/core';

class Grocery extends Component {

  buildGroceryLists = () => {
    return this.props.listNames.map((list, i) => {
      return <GroceryLists list={list} key={i} />
    })
  }

  render() {
    return (
      <Grid container
        direction='column'
        justify="space-between"
        alignItems="stretch"
        spacing={16}>

        <Grid item>
          <Paper style={{ backgroundColor: '#3d8af7', minHeight: '56px' }}>
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={8}>
              <Grid item
                xs={3}>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h4' align='center'>Grocery</Typography>
              </Grid>
              <Grid item xs={3}>
                <NewGroceryList />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>

        </Grid>
        
        {this.props.listNames.length > 0 ? this.buildGroceryLists() : <p>You have no grocery lists yet!</p>

        }

      </Grid>
    )
  }
}

const mapRStoProps = (rs) => {
  return { listNames: rs.grocery.groceryListNames }
}

export default connect(mapRStoProps)(Grocery);
