import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodFormPopup from '../FoodSearchBar/FoodFormPopup';
import PantryTable from './PantryTable';
import BatchActions from './BatchActions';
import BatchActionButton from './BatchActionButton';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Pantry extends Component {



  componentDidMount() {
    this.props.dispatch({ type: "FETCH_PANTRY" });
    this.props.dispatch({ type: 'FETCH_PANTRY_TAGS' })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_FOOD_TO_PANTRY', payload: this.props.pendingPantryItems })
  }

  render() {
    return (
      <Grid container
        direction='column'
        justify="space-between"
        alignItems="stretch"
        spacing={8}>

        <Grid item>
          <Grid container
            justify="center"
            alignItems="flex-start"
            style={{ backgroundColor: '#ffb4b0'}}>
            <Typography variant='h4'>Your Pantry</Typography>
          </Grid>

        </Grid>

        <Grid item>
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center">

            <Grid item
              xs={3} >
              <FoodFormPopup pageView='PANTRY' />
            </Grid>

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

        <Grid item>
          <PantryTable />
        </Grid>

      </Grid >
    )
  }
}

const mapRStoProps = (rs) => {
  return {
    pendingPantryItems: rs.pantry.pendingPantryItems
  }
}

export default connect(mapRStoProps)(Pantry);
