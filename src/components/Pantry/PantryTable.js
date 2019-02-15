import React, { Component } from 'react';
import { connect } from 'react-redux';
import PantryRowItem from './PantryRowItem';



class PantryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: '',

        }
    }

    buildPantryTableRows = () => {
        return this.props.pantry.map((foodObj, i) => {
            return <PantryRowItem key={i} foodObj={foodObj} action={this.state.action} />
        })
    }

    handleActionChange = (event) => {
        this.setState({ action: event.target.value });
    }

    render() {
        let actionButtonDescription;
        switch (this.state.action) {
            case ('Buy More'):
                actionButtonDescription = 'Add To Groceries';
                break;
            case ('Used Up'):
                actionButtonDescription = 'Remove';
                break;
            case ('Find Recipes'):
                actionButtonDescription = 'Begin Search';
                break;
            default:
                actionButtonDescription = '';
        }


        return (
            <div>
                <h2>Your Pantry</h2>
                <select value={this.state.action} onChange={this.handleActionChange}>
                    <option value=''>
                        Many Item Update?
                    </option>
                    <option value='Buy More'>
                        Buy More
                    </option>
                    <option value='Used Up'>
                        Used Up
                    </option>
                    <option value='Find Recipes'>
                        Find Recipes
                    </option>
                </select>
                {this.state.action !== null && <button>{actionButtonDescription}</button>}
                <table>
                    <thead>
                        <tr>
                            <th>
                                Food Name
                            </th>
                            <th>
                                Pantry Tag
                            </th>
                            <th>
                                Date Added
                            </th>
                            <th>{this.state.action === '' ? null : 'Select'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.buildPantryTableRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapRStoProps = (rs) => {
    return { pantry: rs.food.pantry }
}

export default connect(mapRStoProps)(PantryTable);
