import React, { useState } from 'react';
import {Slider, Dialog} from './components';
import './ColorPicker.css';

const ColorPicker = (props) => {
    const [color, setColor] = useState(props.value);

    return (
        <div className='container'>
            <div className='mainPanel'>
                {color}
            </div>

            <div className='controls'>
                <div className='control'>
                    <Slider color={color} />
                </div>
                <div className='control'>
                    <button className='menuToggler'> > </button>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
