import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './FiveDays.css';

// ** modify later: const FiveDays = ({ cod, list }) => {
const FiveDays = ({ cod, day, icon, temp }) => {
// const FiveDays = ({day}) => {

    return (
        <div className='day'>
            <p id='day-name'>{new Date(day * 1000).toString().split(' ').shift()}</p>
            <i className={'wi owm-' + icon}></i>
            <p>{temp} &deg;C</p>
            {/* <p>{day}</p> */}
        </div>
    );
}

export default FiveDays;