import React, { Component } from 'react';
import { connect } from 'react-redux';
import PantryRowItem from './PantryRowItem';



class PantryTable extends Component {

    buildPantryTableRows = () => {
        return this.props.pantry.map((foodObj, i) => {
            return <PantryRowItem key={i} foodObj={foodObj} />
        })
    }

    render() {
        return (
            <div>
                <h2>Your Pantry</h2>
                <table>
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>
                            Food Name
                            </th>
                            <th>
                            Pantry Tag
                            </th>
                            <th>
                            Date Added
                            </th>
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
