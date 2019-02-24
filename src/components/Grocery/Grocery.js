import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroceryLists from './GroceryLists';
import CreateListPopup from './CreateListPopup';

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
        justify="flex-start"
        alignItems="stretch"
        spacing={16}
        style={{minHeight: '450px'}}>

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
                <CreateListPopup />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          {this.props.listNames.length > 0 ?
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={8}>
              {this.buildGroceryLists()}
            </Grid>
            :
            <Typography>You have no grocery lists yet!</Typography>}
        </Grid>

      </Grid>
    )
  }
}

const mapRStoProps = (rs) => {
  return { listNames: rs.grocery.groceryListNames }
}

export default connect(mapRStoProps)(Grocery);
