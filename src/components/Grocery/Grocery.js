import React, { Component } from 'react';
import GroceryForm from '../Grocery/GroceryForm';
import GroceryLists from '../Grocery/GroceryLists';
import {connect} from 'react-redux';

class Grocery extends Component {

  componentDidMount() {
    this.props.dispatch({type: "FETCH_GROCERY"})
  }

  render() {
    return (
      <div>
        <h1>Grocery</h1>
        <GroceryForm />
        <GroceryLists />
      </div>
    )
  }
}

export default connect()(Grocery);
