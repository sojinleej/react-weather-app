import React from 'react';
import './Current.css';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

// ** remove or replace later
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


// fixed: Objects are not valid as a React child (found: object with keys {})
const Current = ({ current, date }) => {

    // fixed: stored all the objects in one index 
    // fixed: {(intermediate value)}.map is not a function
    // fixed: https://stackoverflow.com/questions/52498602/how-to-access-object-properties-of-key-object-reactjs

    const rows = [];
    let id = 0;
    Object.keys(current).map((name, index) => {
        if (index > 3) {
            rows.push({ id: id++, name: name, weatherSpec: current[name] })
        }
    });
    // console.log(rows); 


    return (
        <div className='container'>
            <div className='current-weather'>
                {/* // ** add icon and current date */}
                <div>
                    <h3>{current.city}, {current.country}</h3>
                    <p>{current.weather}</p>
                </div>
                <div>
                    <h1>{current.temp} &deg;C</h1>
                    <p>{date}</p>
                </div>
            </div>

            <div className='current-specs'>
                <Paper className=''>
                    <Table className=''>
                        <TableBody>
                            {/* fixed: Warning: Each child in a list should have a unique "key" prop */}
                            {rows.map((row, index) =>
                                <TableRow key={row.id.toString()}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.weatherSpec}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    );
}
// fixed the export statement later
export default withStyles(styles)(Current);