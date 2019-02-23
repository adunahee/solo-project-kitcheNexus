import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import './FoodSearchBar.css';



// tells autosuggest how to read suggestions for user from redux store
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <span>
        {suggestion.name}
    </span>
);

class FoodSearchBar extends Component {
    constructor(props) {
        super(props);
        // Autosuggest is a controlled component that requires an input value
        // and an onChange handler that updates this value (see below).
        this.state = {
            value: '',
            pageView: this.props.pageView,
        };
    }

    onChange = (event, { newValue }) => {
        if (this.state.pageView === 'GROCERY' || this.state.pageView === 'PANTRY') {
            this.props.dispatch({ type: 'SET_VALUE', payload: newValue });
        } else {
            this.props.dispatch({ type: 'RECIPE_SEARCH_VALUE', payload: newValue });
        }

    };

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        //removes white space and capitals
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        if (inputLength > 1) {
            this.props.dispatch({ type: 'FETCH_FOODS', payload: inputValue })
        };
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.props.dispatch({ type: 'CLEAR_SUGGESTIONS' });
    };

    render() {
        // console.log(this.props);
        // console.log(this.state);
        let value;
        //logic to determine what store value is connected to based on pantryView
        this.state.pageView === 'RECIPE' ?
            value = this.props.recipeSearchValue :
            value = this.props.foodSearchValue;
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        const suggestions = this.props.suggestions.map(food => {
            return { name: food }
        });
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: `eg 'ap'`,
            value,
            onChange: this.onChange
        };


        // Finally, render it!
        return (
            <div>     
                        <Typography>Type 2 letters and food will appear!</Typography>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            id='foods-search-bar'
                        />
            </div>

        );
    }
}

const mapRStoProps = (rs) => {
    return ({
        suggestions: rs.food.searchResults,
        foodSearchValue: rs.food.foodSearchValue,
        recipeSearchValue: rs.food.recipeSearchValue,
    })
}

export default connect(mapRStoProps)(FoodSearchBar);