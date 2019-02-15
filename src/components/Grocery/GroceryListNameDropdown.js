import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroceryListNameDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: null,
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_LIST_NAMES' })
    }

    buildOptions = () => {
        return this.props.groceryListNames.map((c, i) => {
            return (<option
                value={c.id}
                key={i}
            >{c.list_name}
            </option>
            )
        })
    }

    handleListSelect = (event) => {
        this.setState({listName: event.target.value})
    }

    render() {
        return (
            <div>
                <label htmlFor='grocery_list'>Grocery List</label>
                {this.props.groceryListNames.length > 0 &&
                    <select value={this.state.listName === null ? '' : this.state.listName}
                        required
                        onChange={this.handleListSelect}
                    >
                        <option disabled
                            value=''>Choose One</option>
                        {this.buildOptions()}
                    </select>
                }
            </div>
        )
    }
}

const mapRStoProps = (rs) => {
    return { groceryListNames: rs.grocery.groceryListNames }
}

export default connect(mapRStoProps)(GroceryListNameDropdown);