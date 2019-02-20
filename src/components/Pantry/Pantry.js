import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodFormPopup from '../FoodSearchBar/FoodFormPopup';
import PantryTable from './PantryTable';
import BatchActions from './BatchActions';

import Grid from '@material-ui/core/Grid';

class Pantry extends Component {



  componentDidMount() {
    this.props.dispatch({ type: "FETCH_PANTRY" })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_FOOD_TO_PANTRY', payload: this.props.pendingPantryItems })
  }

  render() {
    return (
      <Grid container>
        <Grid container
          alignItems='baseline'
          justify='space-evenly'>
          <FoodFormPopup pageView='PANTRY' />
          <BatchActions />
        </Grid>
        <PantryTable />
      </Grid>
    )
  }
}

const mapRStoProps = (rs) => {
  return {
    pendingPantryItems: rs.pantry.pendingPantryItems
  }
}

export default connect(mapRStoProps)(Pantry);
