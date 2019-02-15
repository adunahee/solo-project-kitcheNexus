import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroceryListItem from '../Grocery/GroceryListItem';

class GroceryLists extends Component {

    //build individual list items
    buildList = () => {
        //creates array of just relevant list items
        return this.props.grocery.map((groceryItem, index) => {
            if(groceryItem.list_name === this.props.list.list_name){
                return <GroceryListItem
                    groceryItem={groceryItem}
                    key={index} />
            } else {
                return null
            }
        }
        )
    }

    render() {
        return (
            <div>
                <h2>{this.props.list.list_name}</h2>
                <ul>
                    {this.props.grocery.length > 0 ? this.buildList() : <li>You have no grocery lists or groceries at this time.</li>}
                </ul>
            </div>
        )
    }
}

const mapRStoProps = (rs) => {
    return { grocery: rs.grocery.grocery }
}

export default connect(mapRStoProps)(GroceryLists);