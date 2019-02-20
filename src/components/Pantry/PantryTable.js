import React, { Component } from 'react';
import { connect } from 'react-redux';
import PantryRowItem from './PantryRowItem';

import Grid from '@material-ui/core/Grid';

class PantryTable extends Component {
    buildPantryTableRows = () => {
        return this.props.pantry.map((foodObj, i) => {
            return <PantryRowItem key={i} foodObj={foodObj}/>
        })
    }

    render() {
        return (
            <Grid container
                direction='row'
                justify='center'>
                
                <Grid item >
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Food Name
                            </th>
                                <th>
                                    Tag
                            </th>
                                <th>
                                    "Age"
                            </th>
                                <th>{this.props.batchAction === '' ? null : 'Select'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.buildPantryTableRows()}
                        </tbody>
                    </table>
                </Grid>

            </Grid>
        )
    }
}

const mapRStoProps = (rs) => {
    return {
        pantry: rs.pantry.pantry,
        batchAction: rs.pantry.batchAction,
    }
}

export default connect(mapRStoProps)(PantryTable);
