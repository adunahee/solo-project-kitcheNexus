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

// collections of redux actions that could be broken out and reused elsewhere
const setValue = (value) => ({ type: 'SET_VALUE', payload: value });
const clearSuggestions = () => ({ type: 'CLEAR_SUGGESTIONS' });
const fetchFoods = value => ({ type: 'FETCH_FOODS', payload: value });
const setRecipeSearchValue = (value) => ({ type: 'RECIPE_SEARCH_VALUE', payload: value });

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
        const { setValue, setRecipeSearchValue } = this.props;
        if (this.state.pageView === 'GROCERY' || this.state.pageView === 'PANTRY') {
            setValue(newValue);
        } else {
            setRecipeSearchValue(newValue);
        }
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.props.clearSuggestions();
    };
    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        //removes white space and capitals
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        if (inputLength > 1) {
            this.props.fetchFoods(inputValue);
        }
    }
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
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

const mapDispatchToProps = {
    setValue: value => setValue(value),
    clearSuggestions: () => clearSuggestions(),
    fetchFoods: value => fetchFoods(value),
    setRecipeSearchValue: value => setRecipeSearchValue(value),
}

export default connect(mapRStoProps, mapDispatchToProps)(FoodSearchBar);