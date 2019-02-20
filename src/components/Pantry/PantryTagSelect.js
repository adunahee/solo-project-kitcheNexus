import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

class PantryTagSelect extends Component {

    handleTagChange = () => {
        // this.props.dispatch({''})
        console.log('in handleTagChange');
        
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
                <select value={this.props.tagValue === null ? '': this.props.tagValue} 
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