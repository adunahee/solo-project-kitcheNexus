import React, { Component } from 'react';
import { connect } from 'react-redux';
import PantryRowItem from './PantryRowItem';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './Pantry.css';

class PantryTable extends Component {
    buildPantryTableRows = () => {
        return this.props.pantry.map((foodObj, i) => {
            return <PantryRowItem key={i} foodObj={foodObj} />
        })
    }

    render() {
        return (
            <Grid container
                direction='row'
                justify='center'>
                <Grid item>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='table-header-cell'>
                                    Food Name
                            </TableCell>
                                <TableCell className='table-header-cell'>
                                    Tag
                            </TableCell>
                                <TableCell className='table-header-cell'>
                                    "Age"
                            </TableCell>
                                <TableCell className='table-header-cell'>{this.props.batchAction && this.props.batchAction !== 'Update Tags' && 'Select'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.buildPantryTableRows()}
                        </TableBody>
                    </Table>
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
