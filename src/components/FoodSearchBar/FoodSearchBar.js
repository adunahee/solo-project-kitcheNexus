import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';



// tells autosuggest how to read suggestions for user from redux store
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class FoodSearchBar extends Component {
    constructor() {
        super();
        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        this.state = {
            value: '',
        };
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        //removes white space and capitals
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        // Imagine you have a list of languages that you'd like to autosuggest.
        let foodResults = [];
        if (inputLength > 1) {
            this.props.dispatch({ type: 'FETCH_FOODS', payload: inputValue })
            return foodResults;
        } else {
            return foodResults
        }

    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.props.dispatch({type: 'CLEAR_SUGGESTIONS'});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.value);
        this.props.dispatch({type: 'ADD_FOOD_TO_PANTRY', payload: this.state.value})
    }

    render() {
        const value = this.state.value;
         // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        const suggestions = this.props.suggestions.map(food => {
        return { name: food } });
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: `eg 'ba'`,
            value,
            onChange: this.onChange
        };

        console.log(this.state);
        // Finally, render it!
        return (

            <form onSubmit={this.handleSubmit}>
            <p>Type two letters to use the autocompleting search bar to quickly add foods in your pantry.</p>
            <label htmlFor='foods-search-bar'>Search Bar for Foods</label>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    id='foods-search-bar'
                />
                <button type="submit">Add To Pantry</button>
            </form>

        );
    }
}

const mapRStoProps = (rs) => {
    return ({ suggestions: rs.food.searchResults })
}

export default connect(mapRStoProps)(FoodSearchBar);