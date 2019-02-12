import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';
import { connect } from 'react-redux';

class GroceryForm extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_FOOD_TO_GROCERY', payload: this.props.pendingGroceryItems })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='grocery_list'>Choose List</label>
                <select>
                    <option>Placeholder</option>
                </select>
                <FoodSearchBar pageView='GROCERY'/>
                {this.props.pendingGroceryItems.length > 0 &&
                    <div>
                        <h2>Items to Add</h2>
                        <ul>
                            {this.props.pendingGroceryItems.map((item, i) => {
                                return <li key={i}> {item} </li>
                            })}
                        </ul>
                    </div>}
                <button type='submit'>Finalize List</button>
            </form>
        )
    }
}

const mapRStoProps = (rs) => {
    return {pendingGroceryItems: rs.food.pendingGroceryItems}
}

export default connect(mapRStoProps)(GroceryForm);
