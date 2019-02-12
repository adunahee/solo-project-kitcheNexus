import React, { Component } from 'react';
import FoodSearchBar from '../FoodSearchBar/FoodSearchBar';

class GroceryForm extends Component {
    render() {
        return (
            <form>
                <label htmlFor='grocery_list'>Choose List</label>
                <select>
                    <option>Placeholder</option>
                </select>
                <FoodSearchBar />
                <button>Add To List</button>
            </form>
        )
    }
}

export default GroceryForm;
