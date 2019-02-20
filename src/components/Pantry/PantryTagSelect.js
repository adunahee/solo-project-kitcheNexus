import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

class PantryTagSelect extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:  this.props.foodObj.tag_name === null ? 
                '' : 
                this.props.foodObj.tag_id,
        }
    }

    handleTagChange = (event) => {
        // this.props.dispatch({''})
        console.log('in handleTagChange');
        this.setState({value: event.target.value});
        const newTagFoodObj = this.props.foodObj;
        newTagFoodObj.tag_id = event.target.value;
        this.props.dispatch(
            {
                type: 'ADD_TO_BATCH', 
                payload: newTagFoodObj,
            })
    }

    buildOptions = () => {
        return this.props.tags.map((tag, i) => {
            return (
                <option value={tag.id}
                    key={i}>
                {tag.name}
                </option>
            )
        })
    }

    render() {
        return (
            <Grid item>
                <select value={this.state.value}
                    onChange={this.handleTagChange}>
                    <option value='' disabled>
                    Choose One
                    </option>
                    {this.props.tags && this.buildOptions()}
                </select>
            </Grid>
        )
    }
}

const mapRStoProps = (rs) => {
    return {tags: rs.pantry.pantryTags}
}

export default connect(mapRStoProps)(PantryTagSelect)