import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class PantryRowItem extends Component {

    handleClick = async () => {
        let confirmGone = window.confirm('Have you run out of this item?');
        if (confirmGone) {

            let confirmMore = await window.confirm('Do you want to order more?');
            this.props.dispatch({ type: 'REMOVE_FROM_PANTRY', payload: [this.props.foodObj] });
            if (confirmMore) {
                this.props.dispatch({ type: 'ADD_FOOD_TO_GROCERY', payload: { groceries: [this.props.foodObj.food_name] } });
            }
        } else {
            alert('Removal canceled.');
        }

    }

    handleCheckbox = (event) => {
        // console.log(this.props.foodObj);
        if (event.target.checked) {
            this.props.dispatch({ type: 'ADD_TO_BATCH', payload: this.props.foodObj });
        } else {
            this.props.dispatch({ type: 'REMOVE_FROM_BATCH', payload: this.props.foodObj });
        }
    }

    checkBatchItems = () => {
        if (this.props.batchItems) {
            console.log('batchItems evaling true');

            return this.props.batchItems.includes(this.props.foodObj)
        } else {
            return false;
        }

    }

    render() {
        return (
            <tr onClick={this.props.batchAction === '' ? this.handleClick : null}>
                <td>
                    {this.props.foodObj.food_name}
                </td>
                <td>
                    {this.props.foodObj.pantry_tag_name}
                </td>
                <td>
                    {moment(this.props.foodObj.date_added).fromNow(true)}
                </td>
                <td>
                    {this.props.batchAction &&
                        <input type='checkbox'
                            onChange={this.handleCheckbox} />}
                </td>
            </tr>
        )
    }
}

const mapRStoProps = (rs) => {
    return {
        batchItems: rs.food.batchItems,
        batchAction: rs.pantry.batchAction,
    }
}

export default connect(mapRStoProps)(PantryRowItem);
