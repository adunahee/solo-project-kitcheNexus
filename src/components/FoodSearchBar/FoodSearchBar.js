import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';



// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
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
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
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

            foodResults = this.props.suggestions.map(food => {
                return { name: food }
            });
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
        this.setState({
            suggestions: []
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.value);
        this.props.dispatch({type: 'ADD_FOOD_TO_PANTRY', payload: this.state.value})
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type 3 letters to view list of matching foods',
            value,
            onChange: this.onChange
        };

        console.log(this.state);
        // Finally, render it!
        return (

            <form onSubmit={this.handleSubmit}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
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