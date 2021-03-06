import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodFormPopup from '../FoodSearchBar/FoodFormPopup';
import PantryTable from './PantryTable';
import BatchActions from './BatchActions';
import BatchActionButton from './BatchActionButton';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class Pantry extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_FOOD_TO_PANTRY', payload: this.props.pendingPantryItems })
  }

  render() {
    return (
      <Grid container
        direction='column'
        alignItems="stretch"
        spacing={24}
        style={{ minHeight: '450px' }}>

        <Grid item>
          <Paper style={{ backgroundColor: '#ff5d55', minHeight: '56px' }}>
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={8}>
              <Grid item
                xs={3}>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h4' align='center'>Pantry</Typography>
              </Grid>
              <Grid item xs={3}>
                <FoodFormPopup pageView='PANTRY' />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {this.props.pantry.length === 0 ?
          <Grid item>
            <Typography align='center'>You have no items in your pantry yet! Begin adding them by using </Typography>
            <FoodFormPopup pageView='PANTRY' />
          </Grid>
          :
          <Grid item>
            <Grid container
              direction="row"
              justify="space-evenly"
              alignItems="center">

              <Grid item
                xs={3}>
                <BatchActions />
              </Grid>

              <Grid item
                xs={3}>
                <BatchActionButton />
              </Grid>

            </Grid>
          </Grid>
        }
        {this.props.pantry.length > 0 &&
          <Grid item>
            <PantryTable />
          </Grid>
        }


      </Grid >
    )
  }
}

const mapRStoProps = (rs) => {
  return {
    pendingPantryItems: rs.pantry.pendingPantryItems,
    pantry: rs.pantry.pantry
  }
}

export default connect(mapRStoProps)(Pantry);
