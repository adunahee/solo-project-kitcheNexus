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
        this.setState({
            value: newValue
        });
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

    //dispatches food item to pendingPantry reducer for storage until all items added
    handleAdd = () => {
        this.props.dispatch({type: `ADD_TO_PENDING_${this.props.pageView}`, payload: this.state.value})
    }

    handleClear = () => {
        this.props.dispatch({type: `CLEAR_PENDING_${this.props.pageView}`})
    }

    render() {
        console.log(this.state);

        const value = this.state.value;
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        const suggestions = this.props.suggestions.map(food => {
            return { name: food }
        });
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: `eg 'bac'`,
            value,
            onChange: this.onChange
        };

        console.log(this.state);
        // Finally, render it!
        return (

            <div onSubmit={this.handleSubmit}>
                <p>Type 2 letter and watch foods appear!</p>
                <label htmlFor='foods-search-bar'>Foods Search</label>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    id='foods-search-bar'
                />
                <button type='button' onClick={this.handleAdd}>Add</button>
                <button type='button' onClick={this.handleClear}>Clear</button>
            </div>

        );
    }
}

const mapRStoProps = (rs) => {
    return ({ suggestions: rs.food.searchResults })
}

export default connect(mapRStoProps)(FoodSearchBar);