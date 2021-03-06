import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import PantryTagSelect from './PantryTagSelect';


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
        this.setState({checked: event.target.checked})
        if (event.target.checked) {
            this.props.dispatch({ type: 'ADD_TO_BATCH', payload: this.props.foodObj });
        } else {
            this.props.dispatch({ type: 'REMOVE_FROM_BATCH', payload: this.props.foodObj });
        }
    }

    render() {
        return (
            <TableRow onClick={this.props.batchAction === '' ? this.handleClick : null}>
                <TableCell>
                    {this.props.foodObj.food_name}
                </TableCell>
                <TableCell>
                    {this.props.batchAction === 'Update Tags' ?
                        <PantryTagSelect
                            foodObj={this.props.foodObj}
                        /> :
                        this.props.foodObj.pantry_tag_name}
                </TableCell>
                <TableCell>
                    {moment(this.props.foodObj.date_added).fromNow(true)}
                </TableCell>
                <TableCell>
                    {this.props.batchAction && this.props.batchAction !== 'Update Tags' &&
                        <input type='checkbox'
                            onChange={this.handleCheckbox}
                            checked={this.props.batchItems.includes(this.props.foodObj)}
                        />}
                </TableCell>
            </TableRow>
        )
    }
}

const mapRStoProps = (rs) => {
    return {
        batchItems: rs.pantry.batchItems,
        batchAction: rs.pantry.batchAction,
    }
}

export default connect(mapRStoProps)(PantryRowItem);
