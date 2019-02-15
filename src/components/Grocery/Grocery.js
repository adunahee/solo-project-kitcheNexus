import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroceryForm from './GroceryFormPopup';
import GroceryLists from './GroceryLists';
import NewGroceryList from './NewGroceryList';


class Grocery extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_LIST_NAMES' })
    this.props.dispatch({ type: "FETCH_GROCERY" });
  }

  buildGroceryLists = () => {
    return this.props.listNames.map((list, i) => {
      return <GroceryLists list={list} key={i} />
    })
  }

  render() {
    return (
      <div>
        <h1>Grocery</h1>
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
