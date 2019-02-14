import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroceryForm from './GroceryForm';
import GroceryLists from './GroceryLists';
import NewGroceryList from './NewGroceryList';


class Grocery extends Component {
  

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
