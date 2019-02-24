import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroceryLists from './GroceryLists';
import NewGroceryList from './NewGroceryList';


class Grocery extends Component {

  buildGroceryLists = () => {
    return this.props.listNames.map((list, i) => {
      return <GroceryLists list={list} key={i} />
    })
  }

  render() {
    return (
      <div>
        <NewGroceryList />
        {this.props.listNames.length > 0 ? this.buildGroceryLists() : <p>You have no grocery lists yet!</p>

        }

      </div>
    )
  }
}

const mapRStoProps = (rs) => {
  return { listNames: rs.grocery.groceryListNames }
}

export default connect(mapRStoProps)(Grocery);
