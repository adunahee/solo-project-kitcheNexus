import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroceryForm from './GroceryForm';
import GroceryLists from './GroceryLists';
import NewGroceryList from './NewGroceryList';


class Grocery extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_LIST_NAMES'});
  }
  

  render() {
    return (
      <div>
        <h1>Grocery</h1>
        <NewGroceryList />
        <GroceryForm />
        <GroceryLists />
      </div>
    )
  }
}

export default connect()(Grocery);
