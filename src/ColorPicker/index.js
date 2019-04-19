import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Slider, Dialog, Menu} from './components';
import styles from './styles.module.css';

const ColorPicker = (props) => {
    const [color, setColor] = useState(props.value || '#ffffff');

    const handleColorChange = (color) => {
        setColor(color);

        if (props.onChange) props.onChange(color);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainPanel}>
                <span className={styles.selectedColor}>{color}</span>
            </div>

            <div className={styles.controls}>
                <div className={styles.control}>
                    <Dialog>
                        <Slider color={color} setColor={handleColorChange} />
                    </Dialog>
                </div>
                <div className={styles.control}>
                    <Dialog>
                        <Menu colors={props.colors} setColor={handleColorChange} />
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

ColorPicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    colors: PropTypes.arrayOf(PropTypes.object)
};

export default ColorPicker;
