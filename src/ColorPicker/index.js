import React, { useState } from 'react';
import {Slider, Dialog, Menu} from './components';
import './ColorPicker.css';

const ColorPicker = (props) => {
    const [color, setColor] = useState(props.value);

    const handleColorChange = (color) => {
        setColor(color);

        if (props.onChange) props.onChange(color);
    };

    return (
        <div className='container'>
            <div className='mainPanel'>
                <span className='selectedColor'>{color}</span>
            </div>

            <div className='controls'>
                <div className='control'>
                    <Dialog>
                        <Slider color={color} setColor={handleColorChange} />
                    </Dialog>
                </div>
                <div className='control'>
                    <Dialog>
                        <Menu colors={props.colors} color={color} setColor={handleColorChange} />
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
