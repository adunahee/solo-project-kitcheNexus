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

    handleDeleteList = () => {
        let confirmation = window.confirm('This will delete the list and all of its contents. Do you want to continue?')
        if(confirmation){
            this.props.dispatch({type: 'DELETE_LIST', payload: this.props.list.id})
        } else {
            alert('Delete canceled.')
        }
    }


    render() {
        return (
            <div>
                <h2>{this.props.list.list_name}</h2>
                <button onClick={this.handleAddList}>Add Groceries</button>
                <button onClick={this.handleDeleteList}>Delete List</button>
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